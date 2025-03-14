export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'borrowed' | 'damaged' | 'lost';
  location: string;
  addedAt: Date;
}

export interface Student {
  id: string;
  registrationNumber: string;
  name: string;
  email: string;
  faculty: string;
  course: string;
  graduationYear: number;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  enrollmentDate: Date;
  academicStatus: 'active' | 'graduated' | 'suspended' | 'withdrawn';
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'returned' | 'overdue';
  fine?: number;
  condition?: 'good' | 'damaged' | 'lost';
  notes?: string;
}

export interface ClearanceRequest {
  id: string;
  studentId: string;
  status: 'pending' | 'approved' | 'rejected' | 'disqualified';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  hasPendingBooks: boolean;
  hasUnpaidFines: boolean;
  overrideReason?: string;
  overrideBy?: string;
  overrideAt?: Date;
  totalFineAmount?: number;
  borrowedBooks?: number;
  overdueBooks?: number;
  damagedBooks?: number;
  lostBooks?: number;
}

export interface ClearanceOverride {
  id: string;
  clearanceId: string;
  reason: string;
  approvedBy: string;
  approvedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'expired' | 'revoked';
}