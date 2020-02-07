// In a real app this would be imported from `vets-json-schema`:
// import fullSchema from 'vets-json-schema/dist/2346-schema.json';
// In a real app this would not be imported directly; instead the schema you
// imported above would import and use these common definitions:
import commonDefinitions from 'vets-json-schema/dist/definitions.json';
import { VA_FORM_IDS } from 'platform/forms/constants';
import ConfirmAddressPage from '../components/ConfirmAddress';
import OrderCommentPage from '../components/OrderCommentPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import IntroductionPage from '../containers/IntroductionPage';
import OrderHistory from '../containers/OrderHistory';
import VeteranInformationPage from '../components/VeteranInformationPage';
import prefillTransformer from '../prefill-transformer';

const {
  fullName,
  ssn,
  date,
  dateRange,
  usaPhone,
  // bankAccount,
  // toursOfDuty,
} = commonDefinitions;

// Define all the fields in the form to aid reuse
// const formFields = {
//   fullName: 'fullName',
//   ssn: 'ssn',
//   toursOfDuty: 'toursOfDuty',
//   viewNoDirectDeposit: 'view:noDirectDeposit',
//   viewStopWarning: 'view:stopWarning',
//   bankAccount: 'bankAccount',
//   accountType: 'accountType',
//   accountNumber: 'accountNumber',
//   routingNumber: 'routingNumber',
//   address: 'address',
//   email: 'email',
//   altEmail: 'altEmail',
//   phoneNumber: 'phoneNumber',
// };

// function hasDirectDeposit(formData) {
//   return formData[formFields.viewNoDirectDeposit] !== true;
// }

// Define all the form pages to help ensure uniqueness across all form chapters
const formPages = {
  VeteranInformationPage: 'Veteran Information',
  confirmAddressPage: 'Confirm Address Page',
  orderHistoryPage: 'Order History Page',
  orderCommentsPage: 'Order Comments Page',
};

const formConfig = {
  urlPrefix: '/',
  submitUrl: '/posts',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'complex-form-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: VA_FORM_IDS.FORM_VA_2346A,
  version: 0,
  prefillTransformer,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  title: 'Form 2346',
  defaultDefinitions: {
    fullName,
    ssn,
    date,
    dateRange,
    usaPhone,
  },
  chapters: {
    VeteranInformationChapter: {
      title: formPages.VeteranInformationPage,
      pages: {
        [formPages.VeteranInformationPage]: {
          path: 'veteran-information',
          title: formPages.VeteranInformationPage,
          uiSchema: {
            // [formFields.fullName]: fullNameUI,
            // [formFields.ssn]: ssnUI,
            'ui:description': VeteranInformationPage,
          },
          schema: {
            type: 'object',
            // required: [formFields.fullName],
            properties: {
              // [formFields.fullName]: fullName,
              // [formFields.ssn]: ssn,
            },
          },
        },
      },
    },
    ConfirmAddressChapter: {
      title: formPages.confirmAddressPage,
      pages: {
        [formPages.confirmAddressPage]: {
          path: 'confirm-address',
          title: formPages.confirmAddressPage,
          uiSchema: {
            // [formFields.fullName]: fullNameUI,
            // [formFields.ssn]: ssnUI,
            'ui:description': ConfirmAddressPage,
          },
          schema: {
            type: 'object',
            // required: [formFields.fullName],
            properties: {
              // [formFields.fullName]: fullName,
              // [formFields.ssn]: ssn,
            },
          },
        },
      },
    },
    orderCommentsChapter: {
      title: formPages.orderCommentsPage,
      pages: {
        [formPages.orderCommentsPage]: {
          path: 'order-comments-page',
          title: formPages.orderCommentsPage,
          uiSchema: {
            // [formFields.toursOfDuty]: toursOfDutyUI,
            'ui:description': OrderCommentPage,
          },
          schema: {
            type: 'object',
            properties: {
              // [formFields.toursOfDuty]: toursOfDuty,
            },
          },
        },
      },
    },
    orderHistoryChapter: {
      title: formPages.orderHistoryPage,
      pages: {
        [formPages.orderHistoryPage]: {
          path: 'order-history-page',
          title: formPages.orderHistoryPage,
          uiSchema: {
            // [formFields.address]: address.uiSchema('Mailing address'),
            // [formFields.email]: {
            //   'ui:title': 'Primary email',
            // },
            // [formFields.altEmail]: {
            //   'ui:title': 'Secondary email',
            // },
            // [formFields.phoneNumber]: phoneUI('Daytime phone'),
            'ui:description': OrderHistory,
          },
          schema: {
            type: 'object',
            properties: {
              // [formFields.address]: address.schema(fullSchema, true),
              // [formFields.email]: {
              //   type: 'string',
              //   format: 'email',
              // },
              // [formFields.altEmail]: {
              //   type: 'string',
              //   format: 'email',
              // },
              // [formFields.phoneNumber]: usaPhone,
            },
          },
        },
        // [formPages.directDeposit]: {
        //   path: 'direct-deposit',
        //   title: 'Direct Deposit',
        //   uiSchema: {
        //     'ui:title': 'Direct deposit',
        //     [formFields.viewNoDirectDeposit]: {
        //       'ui:title': 'I don’t want to use direct deposit',
        //     },
        //     [formFields.bankAccount]: _.merge(bankAccountUI, {
        //       'ui:order': [
        //         formFields.accountType,
        //         formFields.accountNumber,
        //         formFields.routingNumber,
        //       ],
        //       'ui:options': {
        //         hideIf: formData => !hasDirectDeposit(formData),
        //       },
        //       [formFields.accountType]: {
        //         'ui:required': hasDirectDeposit,
        //       },
        //       [formFields.accountNumber]: {
        //         'ui:required': hasDirectDeposit,
        //       },
        //       [formFields.routingNumber]: {
        //         'ui:required': hasDirectDeposit,
        //       },
        //     }),
        //     [formFields.viewStopWarning]: {
        //       'ui:description': directDepositWarning,
        //       'ui:options': {
        //         hideIf: hasDirectDeposit,
        //       },
        //     },
        //   },
        //   schema: {
        //     type: 'object',
        //     properties: {
        //       [formFields.viewNoDirectDeposit]: {
        //         type: 'boolean',
        //       },
        //       [formFields.bankAccount]: bankAccount,
        //       [formFields.viewStopWarning]: {
        //         type: 'object',
        //         properties: {},
        //       },
        //     },
        //   },
        // },
      },
    },
  },
};

export default formConfig;
