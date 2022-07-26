const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/')

const router = express.Router()

module.exports = router

router.get('/', checkJwt, (req, res) => {
  const auth0Id = req.user?.sub

  db.getReceipts(auth0Id)
    .then((receipts) => {
      const parsed = receipts.map((receipt) => ({
        ...receipt,
        image: JSON.parse(receipt.image),
      }))
      res.json(parsed)
    })
    .catch(() => {
      res.status(500).send('Server Error')
    })
})

router.post('/', checkJwt, async (req, res) => {
  const auth0Id = req.user?.sub
  const receipt = req.body

  try {
    const idArr = await db.addReceipt(auth0Id, receipt)
    const newReceiptId = idArr[0].id
    console.log(newReceiptId)
    await db.addWarranty(receipt, newReceiptId)
    const createdReceipt = await db.getReceipt(newReceiptId)
    const parsed = {
      ...createdReceipt,
      image: JSON.parse(createdReceipt.image),
    }
    res.json(parsed)
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

router.patch('/', checkJwt, async (req, res) => {
  const auth0Id = req.user?.sub
  const updatedReceipt = req.body

  try {
    await db.updateReceipt(auth0Id, updatedReceipt)
    await db.updateWarranty(updatedReceipt)
    const patchedReceipt = await db.getReceipt(updatedReceipt.id)
    const parsed = {
      ...patchedReceipt,
      image: JSON.parse(patchedReceipt.image),
    }
    res.json(parsed)
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

router.delete('/', checkJwt, async (req, res) => {
  const auth0IdFromToken = req.user?.sub
  const receipt = req.body

  if (auth0IdFromToken === receipt.auth0Id) {
    try {
      await db.deleteReceipt(auth0IdFromToken, receipt)
      await db.deleteWarranty(receipt)
      res.json(receipt.id)
    } catch (err) {
      res.status(500).send('Server Error')
    }
  }
})
