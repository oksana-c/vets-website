import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import { TASK_KEYS } from '../../../constants';
import { isChapterFieldRequired } from '../../../helpers';
import DependentViewField from '../../../../components/DependentViewField';
import { genericSchemas } from '../../../generic-schema';

export const schema = {
  type: 'object',
  properties: {
    deaths: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          deceasedDateOfDeath: genericSchemas.date,
          deceasedLocationOfDeath: genericSchemas.genericLocation,
        },
      },
    },
  },
};

/*
        updateUiSchema: formData => {
          console.log(formData)
          if (formData['view:selectable686Options']['reportDeath'] === true) {
            return {
              'ui:validations': validateBooleanGroup,
              'ui:errorMessages': {
                atLeastOne: 'You must have expenses for at least one benefit.',
              },
              'ui:required': () => true,
              'ui:title': "Child's status (Check all that apply) *(required)",
            };
          } else {
            
          }
        },
*/

export const uiSchema = {
  deaths: {
    'ui:options': { viewField: DependentViewField },
    items: {
      deceasedDateOfDeath: currentOrPastDateUI('Dependent’s date of death'),
      deceasedLocationOfDeath: {
        'ui:title': 'Place of death',
        city: {
          'ui:title': 'City (or APO/FPO/DPO)',
          'ui:required': formData =>
            isChapterFieldRequired(formData, TASK_KEYS.reportDeath),
        },
        state: {
          'ui:title': 'State (or Country if outside the USA)',
          'ui:required': formData =>
            isChapterFieldRequired(formData, TASK_KEYS.reportDeath),
        },
      },
    },
  },
};
