import { gql } from 'apollo-boost'

import { invoiceFragment } from './fragments'

const FETCH_SINGLE_INVOICE = gql`
  query fetchSingleInvoice ($invoiceId: ID!) {
    invoice(id: $invoiceId) {
      ...InvoiceFragment
    }
  }
  ${invoiceFragment}
`

const CREATE_INVOICE = gql`
  mutation createInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      ...InvoiceFragment
    }
  }
  ${invoiceFragment}
`

const UPDATE_INVOICE = gql`
  mutation updateInvoice($input: UpdateInvoiceInput!) {
    updateInvoice(input: $input) {
      ...InvoiceFragment
    }
  }
  ${invoiceFragment}
`

const DESTROY_INVOICE = gql`
  mutation destroyInvoice($input: DestroyInvoiceInput!) {
    destroyInvoice(input: $input)
  }
`


export {
  invoiceFragment,
  FETCH_SINGLE_INVOICE,
  CREATE_INVOICE,
  UPDATE_INVOICE,
  DESTROY_INVOICE
}
