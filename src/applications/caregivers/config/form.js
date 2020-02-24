import fullSchema from 'vets-json-schema/dist/10-10CG-schema.json';
import _ from 'lodash/fp';
import * as getAddressSchema from 'platform/forms-system/src/js/definitions/address';

import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import { states } from 'platform/forms/address';
import { createUSAStateLabels } from 'platform/forms-system/src/js/helpers';
import IntroductionPage from 'applications/caregivers/containers/IntroductionPage';
import ConfirmationPage from 'applications/caregivers/containers/ConfirmationPage';
import {
  VetInfo,
  PrimaryCaregiverInfo,
  SecondaryCaregiverInfo,
} from 'applications/caregivers/components/AdditionalInfo/formInfo';
import {
  primaryCaregiverFields,
  secondaryCaregiverFields,
  vetFields,
} from 'applications/caregivers/definitions/constants';
import NeedHelpFooter from 'applications/caregivers/components/NeedHelpFooter';
import PreSubmitInfo from 'applications/caregivers/components/PreSubmitInfto';
import {
  medicalCenterLabels,
  medicalCentersByState,
} from 'applications/hca/helpers';
import definitions from '../definitions/caregiverUI';

const emptyFacilityList = [];
const stateLabels = createUSAStateLabels(states);

const vaMedicalFacility = {
  type: 'string',
  enum: [
    '405HK',
    '405GA',
    '405HA',
    '405HB',
    '405HF',
    '405GC',
    '405',
    '436GA',
    '436GB',
    '436GC',
    '436GD',
    '436GF',
    '436GH',
    '436GI',
    '436GJ',
    '436GK',
    '436A4',
    '436GL',
    '436GM',
    '436HC',
    '436QB',
    '436QC',
    '436QA',
    '436GN',
    '436',
    '437GA',
    '437GB',
    '437GD',
    '437GI',
    '437GF',
    '437GJ',
    '437GK',
    '437GL',
    '437',
    '437GC',
    '618GA',
    '618GB',
    '618GD',
    '618GG',
    '656GA',
    '656GB',
    '437GE',
    '656GC',
    '618GI',
    '618GK',
    '618GL',
    '618GJ',
    '618GN',
    '618QB',
    '618',
    '656',
    '438GA',
    '636A8',
    '636A6',
    '636GP',
    '636GX',
    '438GC',
    '438GD',
    '568A4',
    '568GA',
    '568GB',
    '568HF',
    '568HG',
    '568HJ',
    '568HK',
    '568HP',
    '438GE',
    '438GF',
    '568',
    '438',
    '442GB',
    '636GA',
    '636GB',
    '568HB',
    '568HH',
    '636A4',
    '636A5',
    '636GQ',
    '636GL',
    '636GV',
    '636',
    '442GC',
    '442GD',
    '501GJ',
    '554GB',
    '554GC',
    '554GD',
    '554GE',
    '554GF',
    '554GG',
    '554GH',
    '575GA',
    '554GI',
    '575GB',
    '554QA',
    '442QE',
    '575QC',
    '554',
    '575',
    '459GA',
    '459GB',
    '459GC',
    '459GD',
    '459GG',
    '459',
    '459GE',
    '402GA',
    '402GB',
    '402GC',
    '402GD',
    '402HB',
    '402HC',
    '402HL',
    '402GE',
    '402GF',
    '402',
    '405HC',
    '405HE',
    '608GA',
    '608GC',
    '608GD',
    '608HA',
    '608',
    '463GA',
    '463GB',
    '463GC',
    '463GD',
    '463GE',
    '463',
    '501G2',
    '501GA',
    '501GB',
    '501GC',
    '501GD',
    '501GE',
    '501GH',
    '501GI',
    '501GK',
    '501HB',
    '504BZ',
    '504HA',
    '519GB',
    '756GA',
    '501GM',
    '501GN',
    '501',
    '502GA',
    '502GB',
    '629GA',
    '629GB',
    '629GC',
    '629GD',
    '667GB',
    '629BY',
    '502GG',
    '629GE',
    '629GF',
    '502GF',
    '502GE',
    '502QB',
    '502',
    '629',
    '667',
    '503GA',
    '503GB',
    '503GC',
    '529GA',
    '529GB',
    '529GC',
    '529GD',
    '542GA',
    '542GE',
    '562GA',
    '562GC',
    '646GE',
    '693GG',
    '595GA',
    '595GC',
    '595GD',
    '595GE',
    '642GC',
    '646A4',
    '646GB',
    '646GC',
    '646GD',
    '693GE',
    '529GF',
    '693B4',
    '693GA',
    '693GB',
    '693GC',
    '693GD',
    '693GF',
    '595GF',
    '562GD',
    '562GE',
    '503GD',
    '503GE',
    '642QA',
    '595QA',
    '529A4',
    '642GH',
    '595',
    '503',
    '642',
    '646',
    '693',
    '542',
    '562',
    '529',
    '504BY',
    '504GA',
    '504HB',
    '549GE',
    '549GF',
    '549GH',
    '549GI',
    '580BY',
    '519GA',
    '519GD',
    '519HC',
    '519HD',
    '519HF',
    '549A4',
    '549BY',
    '549GA',
    '549GB',
    '549GC',
    '549GD',
    '635GB',
    '580BZ',
    '580GA',
    '580GC',
    '674GA',
    '674GB',
    '674GC',
    '674GD',
    '671GO',
    '667GC',
    '671A4',
    '671B0',
    '671BY',
    '671BZ',
    '671GA',
    '671GB',
    '671GC',
    '671GD',
    '671GE',
    '671GF',
    '671GG',
    '671GH',
    '671GI',
    '671GJ',
    '671GK',
    '671GL',
    '671GN',
    '549GJ',
    '674HB',
    '740GA',
    '740GC',
    '740GD',
    '740GB',
    '740GE',
    '756GB',
    '580GF',
    '580GG',
    '674A4',
    '674BY',
    '580GD',
    '580GE',
    '580GH',
    '671GP',
    '740GH',
    '740GJ',
    '671GQ',
    '674GF',
    '740GI',
    '549GM',
    '549GL',
    '756QB',
    '580QB',
    '549GK',
    '580GJ',
    '504',
    '519',
    '671',
    '674',
    '756',
    '549',
    '580',
    '740',
    '506GA',
    '539GB',
    '541BY',
    '541BZ',
    '541GB',
    '541GC',
    '541GD',
    '538GA',
    '538GB',
    '538GC',
    '538GD',
    '552GA',
    '552GB',
    '552GD',
    '541GE',
    '541GF',
    '541GG',
    '541GH',
    '541GI',
    '562GB',
    '757GB',
    '541GJ',
    '541GK',
    '757GC',
    '646GA',
    '538GE',
    '757GD',
    '757GA',
    '539GE',
    '539GF',
    '541GL',
    '541GM',
    '538GF',
    '541GN',
    '581GG',
    '539QC',
    '539QD',
    '757',
    '538',
    '539',
    '541',
    '552',
    '506GB',
    '506GC',
    '553GA',
    '553GB',
    '515BY',
    '515GA',
    '515GB',
    '515GC',
    '585GA',
    '585GC',
    '585GD',
    '585HA',
    '585HB',
    '655GA',
    '655GB',
    '655GC',
    '655GD',
    '655GH',
    '655GI',
    '655GF',
    '655GE',
    '655GG',
    '506',
    '515',
    '655',
    '553',
    '585',
    '508GA',
    '508GE',
    '508GF',
    '508GH',
    '509A0',
    '534BY',
    '557GA',
    '557GB',
    '573GA',
    '619GA',
    '509GA',
    '557HA',
    '508GG',
    '573GJ',
    '508GI',
    '508GK',
    '557GC',
    '508GJ',
    '557GE',
    '534GE',
    '557GF',
    '619QB',
    '573GM',
    '508GL',
    '509QA',
    '508',
    '509',
    '557',
    '512GA',
    '512GC',
    '512GD',
    '512GE',
    '512GF',
    '460HM',
    '613GA',
    '613GB',
    '688GD',
    '512A5',
    '688GE',
    '613GG',
    '512GG',
    '512QA',
    '688GF',
    '512',
    '539GA',
    '626GC',
    '581GA',
    '603GD',
    '603GE',
    '596A4',
    '596GA',
    '596HA',
    '603GA',
    '603GC',
    '539GD',
    '596GD',
    '596GC',
    '603GF',
    '603GH',
    '596GB',
    '626GJ',
    '539A4',
    '596',
    '603',
    '539GC',
    '537BY',
    '552GC',
    '610A4',
    '610GB',
    '583GA',
    '583GB',
    '603GB',
    '603GG',
    '610GC',
    '610GD',
    '583GC',
    '583GE',
    '583GD',
    '583QB',
    '583GG',
    '583QD',
    '610BY',
    '610',
    '583',
    '540GA',
    '540GB',
    '540GC',
    '613GD',
    '613GE',
    '613HK',
    '581GB',
    '540HK',
    '540GD',
    '517GB',
    '581GH',
    '517',
    '613',
    '540',
    '581',
    '544BZ',
    '544GB',
    '544GC',
    '544GD',
    '544GE',
    '544GF',
    '534GB',
    '534GC',
    '509GB',
    '534GD',
    '544GG',
    '534GF',
    '544',
    '534',
    '546B0',
    '546BZ',
    '546GA',
    '546GB',
    '546GC',
    '516BZ',
    '516GA',
    '516GB',
    '516GC',
    '516GD',
    '516GE',
    '516GF',
    '573A4',
    '573BY',
    '573GB',
    '573GD',
    '573GE',
    '573GF',
    '573GG',
    '516GH',
    '520BZ',
    '520GB',
    '546GD',
    '546GE',
    '548GA',
    '548GB',
    '548GC',
    '548GD',
    '548GE',
    '548GF',
    '573GI',
    '675GA',
    '675GE',
    '675GF',
    '520GC',
    '573GK',
    '675GD',
    '675GB',
    '675GC',
    '675GG',
    '573GL',
    '673BZ',
    '673GB',
    '673GC',
    '673GF',
    '546GF',
    '546GH',
    '520QA',
    '573GN',
    '673GG',
    '573QK',
    '673GH',
    '516',
    '673',
    '546',
    '548',
    '573',
    '675',
    '528A4',
    '528A5',
    '528A6',
    '528A7',
    '528A8',
    '528GB',
    '528GC',
    '528GD',
    '528GK',
    '528GQ',
    '528GR',
    '526GA',
    '526GB',
    '526GD',
    '630A4',
    '630A5',
    '630GA',
    '630GB',
    '630GC',
    '632GA',
    '632HA',
    '632HB',
    '632HC',
    '632HD',
    '620A4',
    '620GA',
    '620GB',
    '620GD',
    '620GE',
    '620GF',
    '620GG',
    '620GH',
    '620',
    '630',
    '632',
    '526',
    '528',
    '531GE',
    '687GB',
    '668GB',
    '660GA',
    '531GG',
    '531GI',
    '531GJ',
    '531',
    '537GA',
    '537HA',
    '550BY',
    '550GA',
    '550GD',
    '556GA',
    '556GC',
    '578GA',
    '578GD',
    '578GF',
    '578GG',
    '607HA',
    '657A5',
    '657GA',
    '537GD',
    '607GF',
    '550GF',
    '578GC',
    '578GE',
    '537',
    '550',
    '556',
    '578',
    '556GD',
    '585GB',
    '618BY',
    '607GC',
    '607GD',
    '607GE',
    '618GE',
    '676GA',
    '676GB',
    '676GC',
    '695GD',
    '676GD',
    '676GE',
    '695BY',
    '695GA',
    '695GC',
    '695HK',
    '618GH',
    '618GM',
    '607GG',
    '607',
    '676',
    '695',
    '558GA',
    '558GB',
    '558GC',
    '565GA',
    '565GC',
    '659GB',
    '659BY',
    '659GA',
    '565GD',
    '590GC',
    '637GB',
    '565GE',
    '637GA',
    '565GF',
    '565GG',
    '659GC',
    '637GC',
    '565GL',
    '659BZ',
    '558GD',
    '558GE',
    '558GF',
    '565GH',
    '565GI',
    '565GK',
    '565QC',
    '565QD',
    '565GM',
    '637',
    '659',
    '558',
    '565',
    '561A4',
    '561BY',
    '561BZ',
    '561GA',
    '561GB',
    '561GD',
    '561GE',
    '561GF',
    '561GH',
    '561GI',
    '460HE',
    '460HO',
    '561GJ',
    '642GD',
    '561GK',
    '642GA',
    '460HG',
    '460GD',
    '642GF',
    '561',
    '460GA',
    '460HK',
    '460HL',
    '460GC',
    '460',
    '586GA',
    '586GB',
    '586GC',
    '614GA',
    '614GC',
    '520A0',
    '520BY',
    '586GF',
    '586GD',
    '586GE',
    '586UMC',
    '586GG',
    '586QB',
    '586QC',
    '520',
    '586',
    '640A0',
    '640A4',
    '640BY',
    '570GA',
    '570GB',
    '612A4',
    '612B4',
    '612BY',
    '612GD',
    '612GE',
    '612GF',
    '612GG',
    '612GH',
    '605GA',
    '605GB',
    '605GC',
    '605GD',
    '605GE',
    '600GA',
    '600GB',
    '600GC',
    '600GD',
    '654GA',
    '662GE',
    '640HC',
    '600GE',
    '662GF',
    '662GA',
    '662GB',
    '662GC',
    '662GD',
    '664BY',
    '664GA',
    '664GB',
    '664GC',
    '664GD',
    '640GA',
    '640GB',
    '640HA',
    '640HB',
    '691GE',
    '691GF',
    '691GG',
    '691GK',
    '691GL',
    '691GM',
    '691GN',
    '691GO',
    '640GC',
    '654GD',
    '570GC',
    '662GG',
    '612GI',
    '691A4',
    '691GB',
    '691GC',
    '691GD',
    '612GJ',
    '605BZ',
    '612QD',
    '600',
    '605',
    '612',
    '640',
    '662',
    '664',
    '691',
    '570',
    '568HA',
    '666GF',
    '666GB',
    '666GC',
    '666GD',
    '666GE',
    '442MB',
    '442HK',
    '666QA',
    '666QB',
    '666QC',
    '442QD',
    '666',
    '442',
    '518GA',
    '518GB',
    '518GE',
    '518GG',
    '523A4',
    '523A5',
    '523BY',
    '523BZ',
    '523GA',
    '523GB',
    '523GC',
    '523GD',
    '631BY',
    '631GC',
    '631GD',
    '650GA',
    '650GB',
    '631GE',
    '631GF',
    '631QB',
    '518',
    '523',
    '631',
    '613GC',
    '613GF',
    '652GA',
    '688GA',
    '652GE',
    '658GA',
    '658GB',
    '658GC',
    '621GJ',
    '590GB',
    '652GF',
    '658GE',
    '658GD',
    '621GC',
    '652GH',
    '652GG',
    '590GD',
    '652GB',
    '590',
    '652',
    '658',
    '614GB',
    '564GA',
    '564GB',
    '598GD',
    '598A0',
    '598GA',
    '598GB',
    '598GC',
    '598GE',
    '598GF',
    '667GA',
    '614GN',
    '564GD',
    '598GG',
    '598GH',
    '598',
    '564',
    '614GD',
    '621GA',
    '626A4',
    '626GA',
    '626GE',
    '626GF',
    '626GG',
    '626GH',
    '614GF',
    '614GE',
    '621BY',
    '614GG',
    '614GH',
    '614GI',
    '621GI',
    '626GM',
    '626GL',
    '626GK',
    '621GG',
    '621GK',
    '626QA',
    '626QB',
    '626QC',
    '621QE',
    '626GP',
    '626GO',
    '614',
    '621',
    '626',
    '564BY',
    '657A0',
    '657A4',
    '657GB',
    '657GD',
    '589A4',
    '589G1',
    '589GB',
    '589GD',
    '589GZ',
    '564GC',
    '589JB',
    '657GS',
    '589HK',
    '564GF',
    '657GX',
    '657GY',
    '589JF',
    '589',
    '657',
    '520GA',
    '521GA',
    '521GB',
    '521GC',
    '521GD',
    '521GE',
    '521GF',
    '619A4',
    '619GB',
    '521GG',
    '619GD',
    '521GI',
    '521GH',
    '679HK',
    '619GE',
    '679GA',
    '521GJ',
    '521',
    '619',
    '679',
    '653BY',
    '653GA',
    '653GB',
    '648GA',
    '648GB',
    '648GD',
    '692GA',
    '648GF',
    '692GB',
    '648GG',
    '648GE',
    '687GC',
    '648GH',
    '531GH',
    '648GI',
    '648GJ',
    '653QA',
    '648',
    '653',
    '692',
    '623BY',
    '623GA',
    '635GA',
    '635GC',
    '635GD',
    '635HB',
    '564GE',
    '623GB',
    '635GE',
    '635GF',
    '635GG',
    '635QB',
    '623QC',
    '635QC',
    '623',
    '635',
    '654GB',
    '593GC',
    '660GC',
    '654GC',
    '593GD',
    '593GE',
    '593GF',
    '593GG',
    '654GE',
    '593GH',
    '593QC',
    '654QD',
    '593',
    '654',
    '589A5',
    '589A6',
    '589A7',
    '589GC',
    '589G9',
    '589JC',
    '644BY',
    '644GA',
    '644GB',
    '644GC',
    '644GD',
    '649GA',
    '649GB',
    '649GC',
    '649GD',
    '649GE',
    '649HK',
    '678GA',
    '678GB',
    '678GD',
    '678GE',
    '644GF',
    '678GG',
    '678GC',
    '644GE',
    '678GF',
    '644GG',
    '644GH',
    '678QA',
    '644QB',
    '678QB',
    '644',
    '649',
    '678',
    '648A4',
    '687GA',
    '687HA',
    '668GA',
    '663HK',
    '668HK',
    '663A4',
    '663GA',
    '663GB',
    '663GD',
    '663GC',
    '663GE',
    '663',
    '668',
    '687',
    '650GD',
    '650QA',
    '650QB',
    '650',
    '688GB',
    '688QA',
    '688',
    '689A4',
    '689GA',
    '689GB',
    '689GC',
    '689GD',
    '689GE',
    '689HC',
    '689HK',
    '689',
    '660GJ',
    '660GB',
    '660GD',
    '660GE',
    '660GG',
    '660QC',
    '660',
    '672B0',
    '672BZ',
    '672GC',
    '672GE',
    '672GD',
    '672',
    '672GA',
    '672GB',
    '459GF',
    '459GH',
    '358',
  ],
};

const {
  veteran,
  primaryCaregiver,
  secondaryOneCaregiver,
  secondaryTwoCaregiver,
} = fullSchema.properties;
const veteranProps = veteran.properties;
const primaryCaregiverProps = primaryCaregiver.properties;
const secondaryOneCaregiverProps = secondaryOneCaregiver.properties;
const secondaryTwoCaregiverProps = secondaryTwoCaregiver.properties;

const {
  address,
  date,
  email,
  phone,
  gender,
  vetRelationship,
  ssn,
  fullName,
} = fullSchema.definitions;

const {
  addressUI,
  alternativePhoneNumberUI,
  dateOfBirthUI,
  emailUI,
  facilityTypeUI,
  genderUI,
  hasSecondaryOneCaregiverUI,
  hasSecondaryTwoCaregiverUI,
  // previousTreatmentFacilityUI,
  primaryPhoneNumberUI,
  vetRelationshipUI,
} = definitions.sharedItems;

const { vetUI, primaryCaregiverUI, secondaryCaregiverUI } = definitions;

const hasSecondaryOneCaregiver = formData =>
  formData[primaryCaregiverFields.hasSecondaryOneCaregiverView] === true;

const hasSecondaryTwoCaregiver = formData =>
  formData[
    secondaryCaregiverFields.secondaryOne.hasSecondaryTwoCaregiverView
  ] === true;

/* Chapters
* 1 - Vet/Service Member (required)
* 2 - Primary Family Caregiver (required)
* 3 - Secondary & secondaryTwo Family Caregiver (optional -- up to 2 conditionally)
*/

const formConfig = {
  urlPrefix: '/',
  // submitUrl: '/v0/api',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'caregiver-',
  introduction: IntroductionPage,
  footerContent: NeedHelpFooter,
  preSubmitInfo: PreSubmitInfo,
  confirmation: ConfirmationPage,
  formId: '10-10CG',
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for caregiver benefits.',
    noAuth:
      'Please sign in again to continue your application for caregiver benefits.',
  },
  title: fullSchema.title,
  defaultDefinitions: {
    address,
    date,
    email,
    fullName,
    gender,
    phone,
    ssn,
    vetRelationship,
  },
  chapters: {
    veteranChapter: {
      title: 'VETERAN/SERVICE MEMBER',
      pages: {
        veteranInfoOne: {
          path: 'service-member',
          title: 'Veteran Information',
          uiSchema: {
            'ui:description': VetInfo,
            [vetFields.fullName]: fullNameUI,
            [vetFields.ssn]: vetUI.ssnUI,
            [vetFields.dateOfBirth]: dateOfBirthUI,
            [vetFields.gender]: genderUI,
          },
          schema: {
            type: 'object',
            required: [vetFields.fullName, vetFields.dateOfBirth],
            properties: {
              [vetFields.fullName]: veteranProps.fullName,
              [vetFields.ssn]: veteranProps.ssnOrTin,
              [vetFields.dateOfBirth]: veteranProps.dateOfBirth,
              [vetFields.gender]: veteranProps.gender,
            },
          },
        },
        veteranInfoTwo: {
          path: 'service-member-page2',
          title: 'Veteran Information (Continued)',
          uiSchema: {
            'ui:description': VetInfo,
            [vetFields.address]: addressUI,
            [vetFields.primaryPhoneNumber]: primaryPhoneNumberUI,
            [vetFields.alternativePhoneNumber]: alternativePhoneNumberUI,
            [vetFields.email]: emailUI,
            [vetFields.vaEnrolled]: vetUI.vaEnrolledUI,
            [vetFields.plannedClinic]: vetUI.plannedClinicUI,
            [vetFields.facilityType]: facilityTypeUI,
            'view:preferredFacility': {
              'ui:title':
                'Name of VA medical center or clinic where you receive or plan to receive health care services:y',
              'view:facilityState': {
                'ui:title': 'Facility State',
                'ui:options': {
                  labels: stateLabels,
                },
              },
              vaMedicalFacility: {
                'ui:title': 'Preferred Clinic or Hospital',
                'ui:options': {
                  labels: medicalCenterLabels,
                  updateSchema: form => {
                    const state = _.get(
                      'view:preferredFacility.view:facilityState',
                      form,
                    );
                    if (state) {
                      return {
                        enum: medicalCentersByState[state] || emptyFacilityList,
                      };
                    }

                    return {
                      enum: emptyFacilityList,
                    };
                  },
                },
              },
            },
          },
          schema: {
            type: 'object',
            required: [],
            properties: {
              [vetFields.address]: getAddressSchema.schema(fullSchema, true),
              [vetFields.primaryPhoneNumber]: phone,
              [vetFields.alternativePhoneNumber]: phone,
              [vetFields.email]: veteranProps.email,
              [vetFields.vaEnrolled]: veteranProps.vaEnrolled,
              [vetFields.plannedClinic]: veteranProps.plannedClinic,
              'view:preferredFacility': {
                type: 'object',
                required: ['view:facilityState', 'vaMedicalFacility'],
                properties: {
                  'view:facilityState': {
                    type: 'string',
                    enum: states.USA.map(state => state.value).filter(
                      state => !!medicalCentersByState[state],
                    ),
                  },
                  vaMedicalFacility: _.assign(vaMedicalFacility, {
                    enum: emptyFacilityList,
                  }),
                },
              },
            },
          },
        },
      },
    },
    primaryCaregiverChapter: {
      title: 'PRIMARY FAMILY CAREGIVER',
      pages: {
        primaryCaregiverInfoOne: {
          path: 'primary-caregiver-page1',
          title: 'Primary Caregiver Information',
          uiSchema: {
            'ui:description': () =>
              PrimaryCaregiverInfo({ additionalInfo: true }),
            [primaryCaregiverFields.fullName]: fullNameUI,
            [primaryCaregiverFields.ssn]: primaryCaregiverUI.ssnUI,
            [primaryCaregiverFields.dateOfBirth]: dateOfBirthUI,
            [primaryCaregiverFields.gender]: genderUI,
          },
          schema: {
            type: 'object',
            required: [
              primaryCaregiverFields.fullName,
              primaryCaregiverFields.dateOfBirth,
            ],
            properties: {
              [primaryCaregiverFields.fullName]: primaryCaregiverProps.fullName,
              [primaryCaregiverFields.ssn]: primaryCaregiverProps.ssnOrTin,
              [primaryCaregiverFields.dateOfBirth]:
                primaryCaregiverProps.dateOfBirth,
              [primaryCaregiverFields.gender]: primaryCaregiverProps.gender,
            },
          },
        },
        primaryCaregiverInfoTwo: {
          path: 'primary-caregiver-page2',
          title: 'Primary Caregiver Information (Continued)',
          uiSchema: {
            'ui:description': PrimaryCaregiverInfo,
            [primaryCaregiverFields.address]: addressUI,
            [primaryCaregiverFields.primaryPhoneNumber]: primaryPhoneNumberUI,
            [primaryCaregiverFields.alternativePhoneNumber]: alternativePhoneNumberUI,
            [primaryCaregiverFields.email]: emailUI,
            [primaryCaregiverFields.vetRelationship]: vetRelationshipUI,
            [primaryCaregiverFields.medicaidEnrolled]:
              primaryCaregiverUI.medicaidEnrolledUI,
            [primaryCaregiverFields.medicareEnrolled]:
              primaryCaregiverUI.medicareEnrolledUI,
            [primaryCaregiverFields.tricareEnrolled]:
              primaryCaregiverUI.tricareEnrolledUI,
            [primaryCaregiverFields.champvaEnrolled]:
              primaryCaregiverUI.champvaEnrolledUI,
            [primaryCaregiverFields.otherHealthInsurance]:
              primaryCaregiverUI.otherHealthInsuranceUI,
            [primaryCaregiverFields.otherHealthInsuranceName]:
              primaryCaregiverUI.otherHealthInsuranceNameUI,
            [primaryCaregiverFields.hasSecondaryOneCaregiverView]: hasSecondaryOneCaregiverUI,
          },
          schema: {
            type: 'object',
            required: [],
            properties: {
              [primaryCaregiverFields.address]: getAddressSchema.schema(
                fullSchema,
                false,
              ),
              [primaryCaregiverFields.primaryPhoneNumber]:
                primaryCaregiverProps.primaryPhoneNumber,
              [primaryCaregiverFields.alternativePhoneNumber]:
                primaryCaregiverProps.alternativePhoneNumber,
              [primaryCaregiverFields.email]: primaryCaregiverProps.email,
              [primaryCaregiverFields.vetRelationship]:
                primaryCaregiverProps.vetRelationship,
              [primaryCaregiverFields.medicaidEnrolled]:
                primaryCaregiverProps.medicaidEnrolled,
              [primaryCaregiverFields.medicareEnrolled]:
                primaryCaregiverProps.medicareEnrolled,
              [primaryCaregiverFields.tricareEnrolled]:
                primaryCaregiverProps.tricareEnrolled,
              [primaryCaregiverFields.champvaEnrolled]:
                primaryCaregiverProps.champvaEnrolled,
              [primaryCaregiverFields.otherHealthInsurance]: {
                type: 'boolean',
              },
              [primaryCaregiverFields.otherHealthInsuranceName]:
                primaryCaregiverProps.otherHealthInsuranceName,
              [primaryCaregiverFields.hasSecondaryOneCaregiverView]: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
    secondaryCaregiversChapter: {
      title: 'SECONDARY CAREGIVERS',
      pages: {
        secondaryOneCaregiver: {
          path: 'secondaryOne-caregiver',
          title: 'Secondary Caregiver Information',
          depends: formData => hasSecondaryOneCaregiver(formData),
          uiSchema: {
            'ui:description': SecondaryCaregiverInfo,
            [secondaryCaregiverFields.secondaryOne.fullName]:
              secondaryCaregiverUI.secondaryOne.fullNameUI,
            [secondaryCaregiverFields.secondaryOne.ssn]:
              secondaryCaregiverUI.secondaryOne.ssnUI,
            [secondaryCaregiverFields.secondaryOne.dateOfBirth]: dateOfBirthUI,
            [secondaryCaregiverFields.secondaryOne.gender]: genderUI,
            [secondaryCaregiverFields.secondaryOne.address]:
              secondaryCaregiverUI.secondaryOne.addressUI,
            [secondaryCaregiverFields.secondaryOne
              .primaryPhoneNumber]: primaryPhoneNumberUI,
            [secondaryCaregiverFields.secondaryOne
              .alternativePhoneNumber]: alternativePhoneNumberUI,
            [secondaryCaregiverFields.secondaryOne.email]: emailUI,
            [secondaryCaregiverFields.secondaryOne
              .vetRelationship]: vetRelationshipUI,
            [secondaryCaregiverFields.secondaryOne
              .hasSecondaryTwoCaregiverView]: hasSecondaryTwoCaregiverUI,
          },
          schema: {
            type: 'object',
            properties: {
              [secondaryCaregiverFields.secondaryOne.fullName]:
                secondaryOneCaregiverProps.fullName,
              [secondaryCaregiverFields.secondaryOne.ssn]:
                secondaryOneCaregiverProps.ssnOrTin,
              [secondaryCaregiverFields.secondaryOne.dateOfBirth]:
                secondaryOneCaregiverProps.dateOfBirth,
              [secondaryCaregiverFields.secondaryOne.gender]:
                secondaryOneCaregiverProps.gender,
              [secondaryCaregiverFields.secondaryOne
                .address]: getAddressSchema.schema(fullSchema, false),
              [secondaryCaregiverFields.secondaryOne.primaryPhoneNumber]:
                secondaryOneCaregiverProps.primaryPhoneNumber,
              [secondaryCaregiverFields.secondaryOne.alternativePhoneNumber]:
                secondaryOneCaregiverProps.alternativePhoneNumber,
              [secondaryCaregiverFields.secondaryOne.email]:
                secondaryOneCaregiverProps.email,
              [secondaryCaregiverFields.secondaryOne.vetRelationship]:
                secondaryOneCaregiverProps.vetRelationship,
              [secondaryCaregiverFields.secondaryOne
                .hasSecondaryTwoCaregiverView]: {
                type: 'boolean',
              },
            },
          },
        },
        secondaryTwoCaregiver: {
          path: 'secondaryTwo-caregiver',
          title: 'Secondary Caregiver Information',
          depends: formData => hasSecondaryTwoCaregiver(formData),
          uiSchema: {
            'ui:description': SecondaryCaregiverInfo,

            // separator for secondaryTwo
            [secondaryCaregiverFields.secondaryTwo.fullName]:
              secondaryCaregiverUI.secondaryTwo.fullNameUI,
            [secondaryCaregiverFields.secondaryTwo.ssn]:
              secondaryCaregiverUI.secondaryTwo.ssnUI,
            [secondaryCaregiverFields.secondaryTwo.dateOfBirth]:
              secondaryCaregiverUI.secondaryTwo.dateOfBirthUI,
            [secondaryCaregiverFields.secondaryTwo.gender]:
              secondaryCaregiverUI.secondaryTwo.genderUI,
            [secondaryCaregiverFields.secondaryTwo.address]:
              secondaryCaregiverUI.secondaryTwo.addressUI,
            [secondaryCaregiverFields.secondaryTwo.primaryPhoneNumber]:
              secondaryCaregiverUI.secondaryTwo.primaryPhoneNumberUI,
            [secondaryCaregiverFields.secondaryTwo.alternativePhoneNumber]:
              secondaryCaregiverUI.secondaryTwo.alternativePhoneNumberUI,
            [secondaryCaregiverFields.secondaryTwo.email]:
              secondaryCaregiverUI.secondaryTwo.emailUI,
            [secondaryCaregiverFields.secondaryTwo.vetRelationship]:
              secondaryCaregiverUI.secondaryTwo.vetRelationshipUI,
          },
          schema: {
            type: 'object',
            properties: {
              // separator for secondaryTwo
              [secondaryCaregiverFields.secondaryTwo.fullName]:
                secondaryTwoCaregiverProps.fullName,
              [secondaryCaregiverFields.secondaryTwo.ssn]:
                secondaryTwoCaregiverProps.ssnOrTin,
              [secondaryCaregiverFields.secondaryTwo.dateOfBirth]:
                secondaryTwoCaregiverProps.dateOfBirth,
              [secondaryCaregiverFields.secondaryTwo.gender]:
                secondaryTwoCaregiverProps.gender,
              [secondaryCaregiverFields.secondaryTwo
                .address]: getAddressSchema.schema(fullSchema, false),
              [secondaryCaregiverFields.secondaryTwo.primaryPhoneNumber]:
                secondaryTwoCaregiverProps.primaryPhoneNumber,
              [secondaryCaregiverFields.secondaryTwo.alternativePhoneNumber]:
                secondaryTwoCaregiverProps.alternativePhoneNumber,
              [secondaryCaregiverFields.secondaryTwo.email]:
                secondaryTwoCaregiverProps.email,
              [secondaryCaregiverFields.secondaryTwo.vetRelationship]:
                secondaryTwoCaregiverProps.vetRelationship,
            },
          },
        },
      },
    },
  },
};

export default formConfig;
