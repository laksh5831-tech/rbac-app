const express = require('express');
const router = express.Router();

const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

// GET ALL
router.get('/', getMembers);

// GET ONE
router.get('/:id', getMember);

// CREATE
router.post('/', createMember);

// UPDATE
router.put('/:id', updateMember);

// DELETE
router.delete('/:id', deleteMember);

module.exports = router;