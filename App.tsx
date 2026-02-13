import React, { useState, useEffect } from 'react';
import { FormSection } from './components/FormSection';
import { InputField } from './components/InputField';
import { QuotePreview } from './components/QuotePreview';
import {
  Building2,
  MapPin,
  Phone,
  User,
  Globe2,
  FileText,
  CreditCard,
  ImageIcon,
  Plus,
  Trash2,
  Calculator,
  Printer
} from './components/Icons';
import { AppState, LineItem } from './types';
import logoAsset from './src/assets/Logo.png';

const DEFAULT_LOGO = logoAsset;

const App: React.FC = () => {

  // Initial State matching the provided image
  const [state, setState] = useState<AppState>({
    details: {
      companyName: 'afriwork',
      companyNameEnabled: true,
      logo: DEFAULT_LOGO,
    },
    address: {
      buildingNumber: '111',
      street: 'Street',
      townCity: 'Town/City',
      county: 'County',
      state: 'ST',
      zipCode: '00000',
    },
    contact: {
      tel: '0-000-000-0000',
      fax: '0-000-000-0000',
      email: 'info@yourcompanysite.com',
      website: 'www.yourcompanysite.com',
    },
    person: {
      name: 'John Doe',
      tel: '0-000-000-0000',
    },
    country: {
      taxName: 'VAT',
      vatPercentage: '20.00',
      currencySymbol: '$',
    },
    customer: {
      name: '[Name]',
      companyName: '[Company Name]',
      address: '[Street Address]',
      cityStateZip: '[City, ST ZIP Code]',
      phone: '[Phone]',
      customerId: '[ABC12345]',
    },
    quote: {
      quoteNumber: '[100]',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      validUntil: '[Date]',
      description: '',
      terms: '',
    },
    items: [
      { description: 'Recruitment for Accountant position', number: 1.00, type: 'Intermediate', rate: 17850.00 },
      { description: 'Recruitment for Sales position', number: 4.00, type: 'Junior', rate: 11350.00 },
      { description: 'Recruitment for Cashier position', number: 1.00, type: 'Junior', rate: 11350.00 },
    ],
    totals: {
      subtotal: "74,600.00",
      discount: "-",
      vatRate: "20.00",
      vatAmount: "14,920.00",
      total: "89,520.00"
    }
  });


  const handlePrint = () => {
    window.print();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({
          ...prev,
          details: { ...prev.details, logo: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Line Item Handlers
  const handleItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...state.items];
    // Handle number parsing for rate and number fields
    if (field === 'rate' || field === 'number') {
      const numValue = parseFloat(value as string);
      newItems[index] = {
        ...newItems[index],
        [field]: isNaN(numValue) ? 0 : numValue
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
    }
    setState(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setState(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: 'New Item', number: 1, type: 'Service', rate: 0 }
      ]
    }));
  };

  const removeItem = (index: number) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotals = () => {
    const subtotalVal = state.items.reduce((acc, item) => acc + (item.number * item.rate), 0);
    const vatRateVal = parseFloat(state.country.vatPercentage) || 0;
    const vatAmountVal = subtotalVal * (vatRateVal / 100);
    const totalVal = subtotalVal + vatAmountVal;

    const format = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    setState(prev => ({
      ...prev,
      totals: {
        subtotal: format(subtotalVal),
        discount: prev.totals.discount, // Preserve current discount text
        vatRate: prev.country.vatPercentage,
        vatAmount: format(vatAmountVal),
        total: format(totalVal)
      }
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [state.items, state.country.vatPercentage]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <style>{`
        @media screen {
          .print-only { display: none !important; }
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: hidden !important;
          }

          #print-quote-preview {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 15mm !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            box-shadow: none !important;
            border: none !important;
          }

          /* Force colors and backgrounds */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Print-Only Isolated Container */}
      <div className="print-only">
        <QuotePreview data={state} id="print-quote-preview" />
      </div>

      {/* Screen-Only Application Container */}
      <div className="no-print min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#004d73] p-2 rounded-lg text-white">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Price Quote Generator</h1>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            <Printer size={18} />
            Print Quote
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Form */}
            <div className="lg:col-span-5 space-y-6">

              {/* Quote Details */}
              <FormSection
                title="Quote Meta"
                description="Dates and identifiers."
                icon={<CreditCard size={24} />}
              >
                <InputField
                  label="Quote #"
                  value={state.quote.quoteNumber}
                  onChange={(val) => setState(prev => ({ ...prev, quote: { ...prev.quote, quoteNumber: val } }))}
                  width="half"
                />
                <InputField
                  label="Customer ID"
                  value={state.customer.customerId}
                  onChange={(val) => setState(prev => ({ ...prev, customer: { ...prev.customer, customerId: val } }))}
                  width="half"
                />
                <InputField
                  label="Date"
                  value={state.quote.date}
                  onChange={(val) => setState(prev => ({ ...prev, quote: { ...prev.quote, date: val } }))}
                  width="half"
                />
                <InputField
                  label="Valid Until"
                  value={state.quote.validUntil}
                  onChange={(val) => setState(prev => ({ ...prev, quote: { ...prev.quote, validUntil: val } }))}
                  width="half"
                />
              </FormSection>

              {/* Line Items */}
              <FormSection
                title="Line Items"
                description="Add items, prices, and quantities."
                icon={<FileText size={24} />}
              >
                <div className="md:col-span-2 space-y-4">
                  {state.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                      <button
                        onClick={() => removeItem(index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="block w-full rounded border-gray-300 shadow-sm text-sm p-2 outline-none focus:ring-1 focus:ring-[#004d73] bg-white"
                            placeholder="Item Description"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Number</label>
                          <input
                            type="number"
                            value={item.number}
                            onChange={(e) => handleItemChange(index, 'number', e.target.value)}
                            className="block w-full rounded border-gray-300 shadow-sm text-sm p-2 outline-none focus:ring-1 focus:ring-[#004d73] bg-white"
                          />
                        </div>

                        <div className="col-span-4">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Type</label>
                          <input
                            type="text"
                            value={item.type}
                            onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                            className="block w-full rounded border-gray-300 shadow-sm text-sm p-2 outline-none focus:ring-1 focus:ring-[#004d73] bg-white"
                          />
                        </div>

                        <div className="col-span-5">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Rate</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-xs">{state.country.currencySymbol}</span>
                            </div>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                              className="block w-full rounded border-gray-300 shadow-sm text-sm p-2 pl-6 outline-none focus:ring-1 focus:ring-[#004d73] bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addItem}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#004d73] hover:text-[#004d73] transition-colors flex items-center justify-center gap-2 font-medium bg-white"
                  >
                    <Plus size={18} />
                    Add Line Item
                  </button>
                </div>
              </FormSection>

              {/* Financial Settings */}
              <FormSection
                title="Financial Totals"
                description="Manually edit or auto-calculate."
                icon={<Globe2 size={24} />}
              >
                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={calculateTotals}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                  >
                    <Calculator size={14} />
                    Calculate from Items
                  </button>
                </div>

                <div className="md:col-span-1 flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Tax Type</label>
                  <select
                    value={state.country.taxName}
                    onChange={(e) => setState(prev => ({ ...prev, country: { ...prev.country, taxName: e.target.value } }))}
                    className="block w-full rounded-lg border-gray-300 shadow-sm sm:text-sm border p-2.5 outline-none focus:ring-2 focus:ring-[#004d73] focus:border-[#004d73] bg-white"
                  >
                    <option value="VAT">VAT</option>
                    <option value="Sales Tax">Sales Tax</option>
                    <option value="GST">GST</option>
                  </select>
                </div>
                <InputField
                  label="Currency Symbol"
                  value={state.country.currencySymbol}
                  onChange={(val) => setState(prev => ({ ...prev, country: { ...prev.country, currencySymbol: val } }))}
                  width="half"
                />

                <div className="md:col-span-2 border-t border-gray-100 my-2 pt-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Totals Values (Manual Edit)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Subtotal"
                      value={state.totals.subtotal}
                      onChange={(val) => setState(prev => ({ ...prev, totals: { ...prev.totals, subtotal: val } }))}
                      width="full"
                    />
                    <InputField
                      label="Discount"
                      value={state.totals.discount}
                      onChange={(val) => setState(prev => ({ ...prev, totals: { ...prev.totals, discount: val } }))}
                      width="full"
                    />
                    <InputField
                      label="VAT Rate (%)"
                      value={state.country.vatPercentage}
                      onChange={(val) => setState(prev => ({ ...prev, country: { ...prev.country, vatPercentage: val }, totals: { ...prev.totals, vatRate: val } }))}
                      width="full"
                    />
                    <InputField
                      label="VAT Amount"
                      value={state.totals.vatAmount}
                      onChange={(val) => setState(prev => ({ ...prev, totals: { ...prev.totals, vatAmount: val } }))}
                      width="full"
                    />
                    <InputField
                      label="Total"
                      value={state.totals.total}
                      onChange={(val) => setState(prev => ({ ...prev, totals: { ...prev.totals, total: val } }))}
                      width="full"
                    />
                  </div>
                </div>
              </FormSection>

              {/* Company Details (Logo) */}
              <FormSection
                title="Company Branding"
                description="Logo and Name."
                icon={<Building2 size={24} />}
              >
                <InputField
                  label="Company Name"
                  value={state.details.companyName}
                  onChange={(val) => setState(prev => ({ ...prev, details: { ...prev.details, companyName: val } }))}
                  width="full"
                />
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Company Logo</label>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 h-10 w-24 bg-gray-100 rounded border border-gray-200 overflow-hidden flex items-center justify-center">
                      {state.details.logo ? (
                        <img src={state.details.logo} alt="Preview" className="h-full w-full object-contain" />
                      ) : (
                        <ImageIcon className="text-gray-400" size={16} />
                      )}
                    </div>
                    <label className="cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span>Upload new</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Upload your company logo (PNG, JPG).</p>
                </div>
              </FormSection>

              {/* Customer Details */}
              <FormSection
                title="Customer Details"
                description="Who is this quote for?"
                icon={<User size={24} />}
              >
                <InputField
                  label="Contact Name"
                  value={state.customer.name}
                  onChange={(val) => setState(prev => ({ ...prev, customer: { ...prev.customer, name: val } }))}
                  width="full"
                />
                <InputField
                  label="Company Name"
                  value={state.customer.companyName}
                  onChange={(val) => setState(prev => ({ ...prev, customer: { ...prev.customer, companyName: val } }))}
                  width="full"
                />
                <InputField
                  label="Address"
                  value={state.customer.address}
                  onChange={(val) => setState(prev => ({ ...prev, customer: { ...prev.customer, address: val } }))}
                  width="full"
                />
                <InputField
                  label="City, State, Zip"
                  value={state.customer.cityStateZip}
                  onChange={(val) => setState(prev => ({ ...prev, customer: { ...prev.customer, cityStateZip: val } }))}
                  width="full"
                />
                <InputField
                  label="Phone"
                  value={state.customer.phone}
                  onChange={(val) => setState(prev => ({ ...prev, customer: { ...prev.customer, phone: val } }))}
                  width="full"
                />
              </FormSection>

              {/* Descriptions */}
              <FormSection
                title="Content"
                description="Project details."
                icon={<FileText size={24} />}
              >
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Project Description</label>
                  <textarea
                    className="block w-full rounded-lg border-gray-300 shadow-sm sm:text-sm border p-2.5 outline-none focus:ring-2 focus:ring-[#004d73] focus:border-[#004d73] bg-white h-24"
                    value={state.quote.description}
                    onChange={(e) => setState(prev => ({ ...prev, quote: { ...prev.quote, description: e.target.value } }))}
                  />
                </div>
              </FormSection>

              {/* Sender Address */}
              <FormSection
                title="Sender Address (Footer)"
                description="Your physical location."
                icon={<MapPin size={24} />}
              >
                <InputField
                  label="Building/House Number"
                  value={state.address.buildingNumber}
                  onChange={(val) => setState(prev => ({ ...prev, address: { ...prev.address, buildingNumber: val } }))}
                  width="half"
                />
                <InputField
                  label="Street"
                  value={state.address.street}
                  onChange={(val) => setState(prev => ({ ...prev, address: { ...prev.address, street: val } }))}
                  width="half"
                />
                <InputField
                  label="Town/City"
                  value={state.address.townCity}
                  onChange={(val) => setState(prev => ({ ...prev, address: { ...prev.address, townCity: val } }))}
                  width="half"
                />
                <InputField
                  label="State"
                  value={state.address.state}
                  onChange={(val) => setState(prev => ({ ...prev, address: { ...prev.address, state: val } }))}
                  width="half"
                />
                <InputField
                  label="ZIP"
                  value={state.address.zipCode}
                  onChange={(val) => setState(prev => ({ ...prev, address: { ...prev.address, zipCode: val } }))}
                  width="half"
                />
              </FormSection>

              {/* Contact Info */}
              <FormSection
                title="Sender Contact (Footer)"
                description="Your contact channels."
                icon={<Phone size={24} />}
              >
                <InputField
                  label="Tel."
                  value={state.contact.tel}
                  onChange={(val) => setState(prev => ({ ...prev, contact: { ...prev.contact, tel: val } }))}
                  width="half"
                />
                <InputField
                  label="Fax"
                  value={state.contact.fax}
                  onChange={(val) => setState(prev => ({ ...prev, contact: { ...prev.contact, fax: val } }))}
                  width="half"
                />
                <InputField
                  label="E-mail"
                  value={state.contact.email}
                  onChange={(val) => setState(prev => ({ ...prev, contact: { ...prev.contact, email: val } }))}
                  width="half"
                  type="email"
                />
                <InputField
                  label="Website"
                  value={state.contact.website}
                  onChange={(val) => setState(prev => ({ ...prev, contact: { ...prev.contact, website: val } }))}
                  width="half"
                />
              </FormSection>
            </div>

            {/* Right Column: Preview */}
            <div className="hidden lg:block lg:col-span-7 relative">
              <div className="sticky top-28 space-y-4">
                <div className="flex items-center justify-between px-1 no-print">
                  <h2 className="text-lg font-semibold text-gray-700">Live Preview</h2>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">A4 Document</span>
                </div>

                {/* Preview Container */}
                <div className="rounded-lg bg-gray-200/50 p-4 border border-gray-200 overflow-hidden flex justify-center">
                  <div className="w-full max-w-[500px] xl:max-w-[600px] shadow-2xl transition-all duration-300">
                    <QuotePreview data={state} id="quote-preview" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;