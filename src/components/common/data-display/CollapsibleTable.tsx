import styled from '@emotion/styled';

interface ICollapsibleTableColumn {
  key: string;
  label?: string;
  width?: string;
}

interface ICollapsibleTableRow {
  key: string;
  detail?: React.ReactNode;
  [key: string]: React.ReactNode;
}

interface ICollapsibleTableProps {
  isHeader?: boolean;
  infiniteRowId?: string;
  columns: Readonly<Array<ICollapsibleTableColumn>>;
  rows: Array<ICollapsibleTableRow>;
  selectedRows: Array<string>;
}

const StyledCollapsibleTableCell = styled.td`
  height: 100%;
`;

export default function CollapsibleTable({
  isHeader = false,
  infiniteRowId = '',
  columns,
  rows,
  selectedRows,
}: ICollapsibleTableProps) {
  return (
    <div
      css={{
        width: '100%',
        height: 'calc(100% - 98px)',
        overflow: 'auto',
      }}
    >
      <table
        css={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        {isHeader && (
          <thead>
            {
              <tr>
                {columns.map(column => (
                  <th>{column.label}</th>
                ))}
              </tr>
            }
          </thead>
        )}

        <colgroup>
          {columns.map((column: ICollapsibleTableColumn) => (
            <col key={column.key} width={column.width} />
          ))}
        </colgroup>

        <tbody>
          {rows.map(row => {
            return (
              <tr
                key={row.key}
                css={{
                  height: selectedRows.includes(row.key) ? '344px' : '100px',
                  borderBottom: `1px solid #D2D6DA`,
                  boxSizing: 'border-box',
                }}
              >
                {selectedRows.includes(row.key) && row.detail ? (
                  <StyledCollapsibleTableCell
                    key={`detail-${row.key}`}
                    colSpan={columns.length}
                  >
                    {row.detail}
                  </StyledCollapsibleTableCell>
                ) : (
                  columns.map(column => {
                    return (
                      <StyledCollapsibleTableCell
                        key={`${row.key}-${column.key}`}
                      >
                        {row[column.key]}
                      </StyledCollapsibleTableCell>
                    );
                  })
                )}
              </tr>
            );
          })}

          {infiniteRowId && (
            <tr
              key={infiniteRowId}
              id={infiniteRowId}
              css={{ height: '100px' }}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
