import { CalendarMonth, Favorite, MoreVert, Share } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material'
import React, { useEffect } from 'react'

export default function Receipt(props) {
  const { receipt } = props
  useEffect(() => {}, [])

  return (
    <Card sx={{ width: 320, textAlign: 'center' }}>
      <CardHeader
        title={receipt.name}
        subheader={
          <IconButton disabled>
            <CalendarMonth /> {receipt.purchase_date}
          </IconButton>
        }
      />
      <CardContent>
        <Typography>{receipt.store}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={receipt.image}
        alt={receipt.name}
      />
      <CardContent>
        {receipt.note ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            {`"${receipt.note}"`}
          </Typography>
        ) : null}

        {receipt.expiryDate ? (
          <>
            <Typography variant="body1" color="text.primary">
              Warranty expired on
            </Typography>
            <Typography variant="body1" color="text.primary">
              {receipt.expiryDate}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="text.primary">
            No Warranty
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
