export interface ITableThead {
  columns: string[];
}

const TableThead: React.FC<ITableThead> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>
            <p>{column}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableThead;
