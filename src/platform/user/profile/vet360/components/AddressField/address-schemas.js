import React from 'react';
import AdditionalInfo from '@department-of-veterans-affairs/formation-react/AdditionalInfo';

import ADDRESS_DATA from 'platform/forms/address/data';
import cloneDeep from 'platform/utilities/data/cloneDeep';

import { ADDRESS_FORM_VALUES, FIELD_NAMES, USA } from 'vet360/constants';

// make an object of just the military state codes and names
const MILITARY_STATES = Object.entries(ADDRESS_DATA.states).reduce(
  (militaryStates, [stateCode, stateName]) => {
    if (ADDRESS_DATA.militaryStates.includes(stateCode)) {
      return {
        ...militaryStates,
        [stateCode]: stateName,
      };
    }
    return militaryStates;
  },
  {},
);

const formSchema = {
  type: 'object',
  properties: {
    'view:livesOnMilitaryBase': {
      type: 'boolean',
    },
    'view:livesOnMilitaryBaseInfo': {
      type: 'object',
      properties: {},
    },
    countryName: {
      type: 'string',
      enum: ADDRESS_FORM_VALUES.COUNTRIES,
    },
    addressLine1: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^.*\\S.*',
    },
    addressLine2: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^.*\\S.*',
    },
    addressLine3: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^.*\\S.*',
    },
    city: {
      type: 'string',
    },
    stateCode: {
      type: 'string',
      enum: Object.keys(ADDRESS_DATA.states),
      enumNames: Object.values(ADDRESS_DATA.states),
    },
    province: {
      type: 'string',
    },
    zipCode: {
      type: 'string',
      pattern: '^\\d{5}$',
    },
    internationalPostalCode: {
      type: 'string',
    },
  },
  required: ['countryName', 'addressLine1', 'city'],
};

const uiSchema = {
  'view:livesOnMilitaryBase': {
    'ui:title':
      'I live on a United States military base outside of the United States',
  },
  'view:livesOnMilitaryBaseInfo': {
    'ui:description': () => (
      <div className="vads-u-padding-x--2p5">
        <AdditionalInfo
          status="info"
          triggerText="Learn more about military base addresses"
        >
          <span>
            The United States is automatically chosen as your country if you
            live on a military base outside of the country.
          </span>
        </AdditionalInfo>
      </div>
    ),
  },
  countryName: {
    'ui:title': 'Country',
    'ui:options': {
      updateSchema: formData => {
        if (formData['view:livesOnMilitaryBase']) {
          return {
            enum: [USA.COUNTRY_NAME],
          };
        }
        return {
          enum: ADDRESS_FORM_VALUES.COUNTRIES,
        };
      },
      updateUiSchema: formData => {
        if (formData['view:livesOnMilitaryBase']) {
          return {
            'ui:disabled': true,
          };
        }
        return {
          'ui:disabled': false,
        };
      },
    },
  },
  addressLine1: {
    'ui:title': 'Street address',
    'ui:errorMessages': {
      required: 'Street address is required',
      pattern: 'Street address must be under 100 characters',
    },
  },
  addressLine2: {
    'ui:title': 'Street address',
  },
  addressLine3: {
    'ui:title': 'Street address',
  },
  city: {
    'ui:errorMessages': {
      required: 'City is required',
      pattern: 'City must be under 100 characters',
    },
    'ui:options': {
      replaceSchema: formData => {
        if (formData['view:livesOnMilitaryBase'] === true) {
          return {
            type: 'string',
            title: 'APO/FPO/DPO',
            enum: ADDRESS_DATA.militaryCities,
          };
        }
        return {
          type: 'string',
          title: 'City',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        };
      },
    },
  },
  stateCode: {
    'ui:title': 'State',
    'ui:errorMessages': {
      required: 'State is required',
    },
    'ui:options': {
      hideIf: formData => formData.countryName !== USA.COUNTRY_NAME,
      updateSchema: formData => {
        if (formData['view:livesOnMilitaryBase']) {
          return {
            enum: Object.keys(MILITARY_STATES),
            enumNames: Object.values(MILITARY_STATES),
          };
        }
        return {
          enum: Object.keys(ADDRESS_DATA.states),
          enumNames: Object.values(ADDRESS_DATA.states),
        };
      },
    },
    'ui:required': formData => formData.countryName === USA.COUNTRY_NAME,
  },
  province: {
    'ui:title': 'State/Province/Region',
    'ui:options': {
      hideIf: formData => formData.countryName === USA.COUNTRY_NAME,
    },
  },
  zipCode: {
    'ui:title': 'Zip Code',
    'ui:errorMessages': {
      required: 'Zip code is required',
      pattern: 'Zip code must be 5 digits',
    },
    'ui:options': {
      widgetClassNames: 'usa-input-medium',
      hideIf: formData => formData.countryName !== USA.COUNTRY_NAME,
    },
    'ui:required': formData => formData.countryName === USA.COUNTRY_NAME,
  },
  internationalPostalCode: {
    'ui:title': 'International postal code',
    'ui:errorMessages': {
      required: 'Postal code is required',
    },
    'ui:options': {
      widgetClassNames: 'usa-input-medium',
      hideIf: formData => formData.countryName === USA.COUNTRY_NAME,
    },
    'ui:required': formData => formData.countryName !== USA.COUNTRY_NAME,
  },
};

/**
 * Helper that returns the correct form schema object based on which address
 * field is being rendered
 */
export const getFormSchema = fieldName => {
  if (fieldName === FIELD_NAMES.MAILING_ADDRESS) {
    return cloneDeep(formSchema);
  }
  const schema = cloneDeep(formSchema);
  delete schema.properties['view:livesOnMilitaryBase'];
  delete schema.properties['view:livesOnMilitaryBaseInfo'];
  return schema;
};

/**
 * Helper that returns the correct ui schema object based on which address
 * field is being rendered
 */
export const getUiSchema = fieldName => {
  if (fieldName === FIELD_NAMES.MAILING_ADDRESS) {
    return cloneDeep(uiSchema);
  }
  const schema = cloneDeep(uiSchema);
  delete schema['view:livesOnMilitaryBase'];
  delete schema['view:livesOnMilitaryBaseInfo'];
  return schema;
};
