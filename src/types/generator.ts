export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'radio';

export interface Option {
  label: string;
  value: string;
}

export interface GeneratorField {
  id: string; // The param name in the form state
  label: string;
  type: FieldType;
  description?: string;
  placeholder?: string;
  defaultValue?: string | boolean | number;
  options?: Option[]; // For select and radio
  required?: boolean;
}

export interface GeneratorConfig {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  fields: GeneratorField[];
  // Function to build the command string based on the form state
  generateCommand: (values: Record<string, any>) => string;
  exampleUsage: string;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string; // the name of the lucide icon
}
