"use client";

import { useState } from 'react';
import type { GeneratorField, GeneratorConfig } from '../types/generator';
import CommandPreview from './CommandPreview';
import { Info, ChevronDown, ChevronUp, Terminal, Shield, Zap } from 'lucide-react';
import './FormEngine.css';

interface FormEngineProps {
  generator: GeneratorConfig;
}

export default function FormEngine({ generator }: FormEngineProps) {
  const [currentGeneratorId, setCurrentGeneratorId] = useState(generator.id);
  const [formData, setFormData] = useState<Record<string, string | boolean | number>>(() => {
    const initialData: Record<string, string | boolean | number> = {};
    generator.fields.forEach(field => {
      initialData[field.id] = field.defaultValue !== undefined ? field.defaultValue : '';
    });
    return initialData;
  });

  // Re-initialize when generator changes to avoid useEffect looping
  if (generator.id !== currentGeneratorId) {
    setCurrentGeneratorId(generator.id);
    const initialData: Record<string, string | boolean | number> = {};
    generator.fields.forEach(field => {
      initialData[field.id] = field.defaultValue !== undefined ? field.defaultValue : '';
    });
    setFormData(initialData);
  }

  const handleChange = (fieldId: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const currentCommand = generator.generateCommand(formData);

  const renderField = (field: GeneratorField) => {
    const value = formData[field.id] !== undefined ? formData[field.id] : '';

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id} className="form-label">
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <input
              id={field.id}
              type={field.type}
              className="form-control"
              placeholder={field.placeholder}
              value={typeof value === 'boolean' ? '' : value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
            />
            {field.description && <p className="form-help">{field.description}</p>}
          </div>
        );

      case 'select':
        return (
          <div className="form-group" key={field.id}>
            <label htmlFor={field.id} className="form-label">
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <div className="select-wrapper">
              <select
                id={field.id}
                className="form-control form-select"
                value={typeof value === 'boolean' ? '' : value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
              >
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {field.description && <p className="form-help">{field.description}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-group checkbox-group" key={field.id}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={!!value}
                onChange={(e) => handleChange(field.id, e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <div className="checkbox-text">
                <span className="checkbox-title">{field.label}</span>
                {field.description && <span className="checkbox-desc">{field.description}</span>}
              </div>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-engine-container">
      <div className="form-section">
        <h2 className="section-title">Configure Options</h2>
        <form className="generator-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            {generator.fields.map(renderField)}
          </div>
        </form>
      </div>

      <div className="command-preview-section">
        <h2 className="section-title">Generated Command</h2>
        <CommandPreview command={currentCommand} />
        
        <div className="command-breakdown">
          <h3 className="breakdown-title">
            <Terminal size={18} />
            Command Breakdown
          </h3>
          <ul className="breakdown-list">
            <li className="breakdown-item">
              <span className="breakdown-label">Tool:</span>
              <span className="breakdown-value">{generator.name}</span>
              <span className="breakdown-desc"> &mdash; {generator.description}</span>
            </li>
            {generator.fields.map(field => {
              const val = formData[field.id];
              if (val !== undefined && val !== '' && val !== false) {
                let displayValue = String(val);
                if (field.type === 'select' && field.options) {
                  const selectedOption = field.options.find(opt => opt.value === val);
                  if (selectedOption) {
                    displayValue = selectedOption.label;
                  }
                } else if (field.type === 'checkbox') {
                  displayValue = 'Enabled';
                }

                return (
                  <li key={field.id} className="breakdown-item">
                    <span className="breakdown-label">{field.label}:</span>
                    <span className="breakdown-value">{displayValue}</span>
                    {field.description && <span className="breakdown-desc"> &mdash; {field.description}</span>}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>

      <div className="explanation-section">
        <h2 className="section-title">About this tool</h2>
        <p className="explanation-text">{generator.explanation}</p>
        
        <h3 className="subsection-title">Example Usage:</h3>
        <code className="example-block">{generator.exampleUsage}</code>

        {generator.additionalContent && generator.additionalContent.map((item, index) => (
          <div key={index} className="additional-info">
            <h3 className="subsection-title">{item.title}</h3>
            <p className="explanation-text">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
