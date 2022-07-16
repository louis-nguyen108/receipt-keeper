import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@mui/material'

import Sidebar from './Sidebar'
import Receipts from './Receipts'
import StoresButton from './StoresButton'
import { fetchReceipts } from '../actions'

export default function Main() {
  const token = useSelector((state) => state.loggedInUser.token)
  const receipts = useSelector((state) => state.receipts.data)
  const stores = receipts.map((receipt) => receipt.store)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchReceipts(token))
    }
  }, [token])

  return (
    <Box>
      <StoresButton stores={stores} />
      <Stack direction="row">
        <Sidebar stores={stores} />
        <Receipts receipts={receipts} />
      </Stack>
    </Box>
  )
}
