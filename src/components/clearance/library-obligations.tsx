import { BorrowRecord, Book } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LibraryObligationsProps {
  borrowRecords: (BorrowRecord & { book: Book })[];
}

export function LibraryObligations({ borrowRecords }: LibraryObligationsProps) {
  const calculateFine = (record: BorrowRecord) => {
    if (record.status !== 'overdue' && !record.fine) return 0;
    return record.fine ?? 1000; // Default fine of 1000 per day if not specified
  };

  const getStatusBadge = (status: BorrowRecord['status'], condition?: BorrowRecord['condition']) => {
    if (condition === 'damaged') {
      return <Badge variant="destructive">Damaged</Badge>;
    }
    if (condition === 'lost') {
      return <Badge variant="destructive">Lost</Badge>;
    }
    switch (status) {
      case 'active':
        return <Badge variant="secondary">Borrowed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'returned':
        return <Badge variant="default">Returned</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Library Obligations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead className="text-right">Fine</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{record.book.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.book.author}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{record.borrowDate.toLocaleDateString()}</TableCell>
                <TableCell>{record.dueDate.toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(record.status, record.condition)}</TableCell>
                <TableCell>
                  {record.condition && (
                    <div className="text-sm text-muted-foreground">
                      {record.notes}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {calculateFine(record) > 0 ? (
                    <span className="font-medium text-destructive">
                      UGX {calculateFine(record).toLocaleString()}
                    </span>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}