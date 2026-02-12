import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  width?: 'full' | 'half';
  required?: boolean;
  
  // Toggle props
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (val: boolean) => void;
  toggleLabel?: string;
  
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  width = 'full',
  hasToggle = false,
  toggleValue,
  onToggleChange,
  helperText
}) => {
  const colSpan = width === 'full' ? 'md:col-span-2' : 'md:col-span-1';

  return (
    <div className={`${colSpan} flex flex-col gap-1.5`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {hasToggle && onToggleChange && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{toggleValue ? 'Included' : 'Hidden'}</span>
            <button
              onClick={() => onToggleChange(!toggleValue)}
              type="button"
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                toggleValue ? 'bg-gray-800' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  toggleValue ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
                style={{ transform: toggleValue ? 'translateX(18px)' : 'translateX(2px)' }}
              />
            </button>
          </div>
        )}
      </div>
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-lg border-gray-300 shadow-sm sm:text-sm border p-2.5 outline-none transition-all focus:ring-2 focus:ring-gray-800 focus:border-gray-800 bg-white"
        />
      </div>
      {helperText && <p className="text-xs text-gray-400">{helperText}</p>}
    </div>
  );
};