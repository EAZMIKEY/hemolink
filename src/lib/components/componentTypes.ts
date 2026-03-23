export type BloodComponentType = 'PRBC' | 'Platelets' | 'Plasma' | 'Whole Blood' | 'Cryo' | 'Granulocytes';

export interface ComponentMetadata {
  type: BloodComponentType;
  fullName: string;
  shelfLifeDays: number;
  storageTemp: string;
  description: string;
  color: string;
  icon: string;
}

export const COMPONENT_METADATA: Record<BloodComponentType, ComponentMetadata> = {
  'PRBC': {
    type: 'PRBC',
    fullName: 'Packed Red Blood Cells',
    shelfLifeDays: 42,
    storageTemp: '2°C to 6°C',
    description: 'Used for trauma, surgery, and anemia. Corrects oxygen-carrying capacity.',
    color: 'bg-red-600',
    icon: 'Droplet'
  },
  'Platelets': {
    type: 'Platelets',
    fullName: 'Platelet Concentrate',
    shelfLifeDays: 5,
    storageTemp: '20°C to 24°C (with agitation)',
    description: 'Used for cancer patients, organ transplants, and bleeding disorders.',
    color: 'bg-amber-500',
    icon: 'Activity'
  },
  'Plasma': {
    type: 'Plasma',
    fullName: 'Fresh Frozen Plasma (FFP)',
    shelfLifeDays: 365,
    storageTemp: '-18°C or colder',
    description: 'Used for burn victims, shock, and clotting factor replacement.',
    color: 'bg-yellow-400',
    icon: 'Waves'
  },
  'Whole Blood': {
    type: 'Whole Blood',
    fullName: 'Whole Blood',
    shelfLifeDays: 35,
    storageTemp: '2°C to 6°C',
    description: 'Rarely used directly; usually separated into components.',
    color: 'bg-red-800',
    icon: 'Heart'
  },
  'Cryo': {
    type: 'Cryo',
    fullName: 'Cryoprecipitate',
    shelfLifeDays: 365,
    storageTemp: '-18°C or colder',
    description: 'Used for hemophilia and fibrinogen deficiency.',
    color: 'bg-blue-400',
    icon: 'Snowflake'
  },
  'Granulocytes': {
    type: 'Granulocytes',
    fullName: 'Granulocytes (White Cells)',
    shelfLifeDays: 1,
    storageTemp: '20°C to 24°C',
    description: 'Used for severe infections unresponsive to antibiotics.',
    color: 'bg-slate-400',
    icon: 'Shield'
  }
};
