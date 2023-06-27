import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Box, Button } from '@mui/material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { styled } from '@mui/system'

import view from 'assets/images/view.svg'
import deleteIcon from 'assets/images/delete.svg'
import edit from 'assets/images/edit.svg'

interface IProps {
  archive?: { handleArchive: any }
  editLink?: string
  delete?: { handleDelete: any }
}

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ResponsiveButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    padding: '8px',
    '& img': {
      width: '24px',
      height: '24px',
    },
  },
}))

export default function Actions(props: IProps): JSX.Element {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [openArchive, setOpenArchive] = useState(false)

  const handleArchiveConfirmation = () => {
    props?.archive
      ?.handleArchive?.()
      .unwrap()
      .then(() => {
        toast.success('Item Archive', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setOpenArchive(false)
      })
  }

  const handleDeleteConfirmation = () => {
    props?.delete
      ?.handleDelete?.()
      .unwrap()
      .then(() => {
        toast.success('Item Deleted', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setOpen(false)
      })
  }

  return (
    <div>
      {props.archive && (
        <div>
          <ResponsiveButton type="button" onClick={() => setOpenArchive(true)}>
            <img src={view} alt="view" />
          </ResponsiveButton>
          <Modal
            open={openArchive}
            onClose={() => setOpenArchive(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <div>
                <p>{t('Archive Item')}</p>
              </div>
              <div className="">
                <p>{t('Are you sure to archive item?')}</p>
              </div>
              <div>
                <div>
                  {props?.archive && (
                    <Button variant="contained" onClick={handleArchiveConfirmation}>
                      {t('Confirm Archive')}
                    </Button>
                  )}
                  <Button onClick={() => setOpenArchive(false)}>{t('Cancel')}</Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}

      {props.editLink && (
        <Link to={`${props.editLink}`} className="">
          <img src={edit} alt="history" className="editIcon" />
        </Link>
      )}

      {props.delete && (
        <div>
          <ResponsiveButton type="button" onClick={() => setOpen(true)}>
            <img src={deleteIcon} alt="deleteIcon" />
          </ResponsiveButton>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <div>
                <p>{t('Delete Item')}</p>
              </div>
              <div className="">
                <p>{t('Are you sure to delete item?')}</p>
              </div>
              <div>
                <div>
                  {props?.delete && (
                    <Button variant="contained" onClick={handleDeleteConfirmation}>
                      {t('Confirm Delete')}
                    </Button>
                  )}
                  <Button onClick={() => setOpen(false)}>{t('Cancel')}</Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  )
}
