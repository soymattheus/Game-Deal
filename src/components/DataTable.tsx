import Deal from '../types/Deal';
import { Button } from './Button';

interface DataTableProps {
  children: React.ReactNode;
  Columns: string[];
  deals: Deal[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setIsPagingUpdate?: (isPagingUpdate: boolean) => void;
}

export default function DataTable({
  children,
  Columns,
  deals,
  loading,
  currentPage,
  setCurrentPage,
  setIsPagingUpdate = () => {},
}: DataTableProps) {
  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-blue-300 text-gray-700">
            <tr>
              {Columns?.map((column) => (
                <th key={column} className="p-2 border">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="animate-pulse">
                    {Columns.map((_, colIndex) => (
                      <td key={colIndex} className="p-2 border">
                        <div className="h-14 p-2 bg-gray-300 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : children
            }
          </tbody>
        </table>
      </div>

      {/* Paginação */}
        <div className="flex justify-center mt-4 gap-2">
            <Button 
                disabled={currentPage === 0 || loading}
                onClick={() => 
                  {setCurrentPage(currentPage - 1)
                  setIsPagingUpdate(true)
                }}
                className="disabled:opacity-50"
            >
                Previous
            </Button>

          <span className="px-3 py-1 text-gray-700">Page {currentPage + 1}</span>

          <Button
            onClick={() => 
              {setCurrentPage(currentPage + 1)
              setIsPagingUpdate(true)
            }}
            disabled={deals.length < 5 || loading}
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
    </div>
  );
}
