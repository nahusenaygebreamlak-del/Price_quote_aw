import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100 flex items-start gap-4 bg-white">
        {icon && (
          <div className="p-2 rounded-lg text-gray-700 bg-gray-50">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
      <div className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};