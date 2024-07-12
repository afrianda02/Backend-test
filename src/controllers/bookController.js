const books = require('../models/Book');
const members = require('../models/Member');

exports.getBooks = (req, res) => {
  const availableBooks = books.filter(book => book.stock > 0);
  res.json(availableBooks);
};

exports.borrowBook = (req, res) => {
  const { memberId, bookCode } = req.body;
  const member = members.find(m => m.code === memberId);
  const book = books.find(b => b.code === bookCode);

  if (!member || !book) {
    return res.status(404).json({ message: 'Member or book not found' });
  }

  if (member.penaltyEnd && new Date(member.penaltyEnd) > new Date()) {
    return res.status(400).json({ message: 'Member is currently penalized' });
  }

  if (member.borrowedBooks.length >= 2) {
    return res.status(400).json({ message: 'Member may not borrow more than 2 books' });
  }

  if (book.stock === 0) {
    return res.status(400).json({ message: 'Book is not available' });
  }

  member.borrowedBooks.push({ bookCode: book.code, borrowDate: new Date() });
  book.stock -= 1;

  res.json({ message: 'Book borrowed successfully', member });
};

exports.returnBook = (req, res) => {
  const { memberId, bookCode } = req.body;
  const member = members.find(m => m.code === memberId);
  const book = books.find(b => b.code === bookCode);

  if (!member || !book) {
    return res.status(404).json({ message: 'Member or book not found' });
  }

  const borrowedBookIndex = member.borrowedBooks.findIndex(b => b.bookCode === bookCode);
  if (borrowedBookIndex === -1) {
    return res.status(400).json({ message: 'The returned book is not borrowed by the member' });
  }

  const borrowedBook = member.borrowedBooks[borrowedBookIndex];
  const borrowDate = new Date(borrowedBook.borrowDate);
  const returnDate = new Date();

  member.borrowedBooks.splice(borrowedBookIndex, 1);
  book.stock += 1;

  if ((returnDate - borrowDate) / (1000 * 60 * 60 * 24) > 7) {
    member.penaltyEnd = new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  }

  res.json({ message: 'Book returned successfully', member });
};
