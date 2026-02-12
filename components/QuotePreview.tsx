import React from 'react';
import { AppState } from '../types';

interface QuotePreviewProps {
  data: AppState;
  id?: string;
}

export const QuotePreview: React.FC<QuotePreviewProps> = ({ data, id }) => {
  const HEADER_COLOR = '#004d73'; // Dark blue from image
  const BLOCK_BLUE = '#2563eb'; // High contrast blue for totals
  const currency = data.country.currencySymbol;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div
      id={id}
      className="bg-white text-gray-900 shadow-xl mx-auto flex flex-col text-[9px] leading-tight font-sans"
      style={{
        width: '100%',
        aspectRatio: '210/297', // A4 Ratio
        padding: '15mm', // Standard print margin
        boxSizing: 'border-box',
      }}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        {/* Logo */}
        <div className="flex items-center justify-start h-[50px]">
          {data.details.logo ? (
            <img
              src={data.details.logo}
              alt="Company Logo"
              className="object-contain object-left h-full max-w-[200px]"
            />
          ) : (
            <div className="h-full w-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 italic">
              No Logo
            </div>
          )}
        </div>

        {/* Quote Meta */}
        <div className="flex flex-col items-end text-gray-900">
          <h1 className="text-2xl font-bold text-[#004d73] mb-2">Quote</h1>
          <table className="border-separate text-[9px] text-gray-900" style={{ borderSpacing: 0 }}>
            <tbody>
              <tr>
                <td className="text-right font-bold pr-2 pb-1 pdf-label">Date</td>
                <td className="border border-gray-400 px-2 py-0.5 w-28 pdf-value">{data.quote.date}</td>
              </tr>
              <tr>
                <td className="text-right font-bold pr-2 pb-1 pdf-label">Valid Until</td>
                <td className="border border-gray-400 px-2 py-0.5 pdf-value">{data.quote.validUntil}</td>
              </tr>
              <tr>
                <td className="text-right font-bold pr-2 pb-1 pdf-label">Quote #</td>
                <td className="border border-gray-400 px-2 py-0.5 pdf-value">{data.quote.quoteNumber}</td>
              </tr>
              <tr>
                <td className="text-right font-bold pr-2 pb-1 pdf-label">Customer ID</td>
                <td className="border border-gray-400 px-2 py-0.5 pdf-value">{data.customer.customerId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer & Description Row */}
      <div className="flex gap-6 mb-6">
        {/* Customer Column */}
        <div className="flex-1">
          <div className="text-white font-bold px-2 py-1 mb-1" style={{ backgroundColor: HEADER_COLOR }}>
            Customer:
          </div>
          <div className="px-2 space-y-1 text-gray-900">
            <p className="font-medium">{data.customer.name}</p>
            <p>{data.customer.companyName}</p>
            <p>{data.customer.address}</p>
            <p>{data.customer.cityStateZip}</p>
            <p>{data.customer.phone}</p>
          </div>
        </div>

        {/* Description Column */}
        <div className="flex-[1.5] flex flex-col">
          <div className="text-white font-bold px-2 py-1 mb-1" style={{ backgroundColor: HEADER_COLOR }}>
            Quote/Project Description
          </div>
          <div className="border border-gray-300 flex-1 p-2 min-h-[80px] text-gray-900">
            {data.quote.description}
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-6">
        <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
          <thead>
            <tr className="text-white" style={{ backgroundColor: HEADER_COLOR }}>
              <th className="px-2 py-1 text-left font-bold w-1/2 border-b border-gray-200">Description</th>
              <th className="px-2 py-1 text-center font-bold border-b border-gray-200">Number</th>
              <th className="px-2 py-1 text-center font-bold border-b border-gray-200">Type</th>
              <th className="px-2 py-1 text-right font-bold border-b border-gray-200">Rate</th>
              <th className="px-2 py-1 text-right font-bold border-b border-gray-200">Line Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data.items.map((item, index) => (
              <tr key={index} className="bg-white border-b border-gray-100">
                <td className="px-2 py-1 border-r border-gray-200 text-gray-900 pdf-cell">{item.description}</td>
                <td className="px-2 py-1 text-center border-r border-gray-200 text-gray-900 pdf-cell">{item.number.toFixed(2)}</td>
                <td className="px-2 py-1 text-center border-r border-gray-200 text-gray-900 pdf-cell">{item.type}</td>
                <td className="px-2 py-1 text-right border-r border-gray-200 text-gray-900 pdf-cell">{formatCurrency(item.rate)}</td>
                <td className="px-2 py-1 text-right text-gray-900 pdf-cell">{formatCurrency(item.number * item.rate)}</td>
              </tr>
            ))}
            {/* Empty Rows Filler */}
            {Array.from({ length: Math.max(0, 12 - data.items.length) }).map((_, i) => (
              <tr key={`empty-${i}`} className="bg-white border-b border-gray-100">
                <td className="px-2 py-1 border-r border-gray-200">&nbsp;</td>
                <td className="px-2 py-1 border-r border-gray-200">&nbsp;</td>
                <td className="px-2 py-1 border-r border-gray-200">&nbsp;</td>
                <td className="px-2 py-1 border-r border-gray-200">&nbsp;</td>
                <td className="px-2 py-1">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-64 text-gray-900">
          <div className="flex flex-col gap-[2px]">
            {/* Subtotal */}
            <div className="flex justify-end gap-[4px]">
              <div className="px-2 py-[2px] text-white font-bold min-w-[70px] text-right" style={{ backgroundColor: BLOCK_BLUE }}>
                Subtotal
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[20px] text-center bg-white border border-gray-200">
                {currency}
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[80px] text-right bg-white border border-gray-200">
                {data.totals.subtotal}
              </div>
            </div>

            {/* Discount */}
            <div className="flex justify-end gap-[4px]">
              <div className="px-2 py-[2px] text-white font-bold min-w-[70px] text-right" style={{ backgroundColor: BLOCK_BLUE }}>
                Discount
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[20px] text-center bg-white border border-gray-200">
                {currency}
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[80px] text-right bg-white border border-gray-200">
                {data.totals.discount}
              </div>
            </div>

            {/* VAT Rate */}
            <div className="flex justify-end gap-[4px]">
              <div className="px-2 py-[2px] text-white font-bold min-w-[70px] text-right" style={{ backgroundColor: BLOCK_BLUE }}>
                VAT Rate
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[20px] text-center bg-white border border-gray-200">
                %
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[80px] text-right bg-white border border-gray-200">
                {data.totals.vatRate}
              </div>
            </div>

            {/* VAT */}
            <div className="flex justify-end gap-[4px]">
              <div className="px-2 py-[2px] text-white font-bold min-w-[70px] text-right" style={{ backgroundColor: BLOCK_BLUE }}>
                {data.country.taxName}
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[20px] text-center bg-white border border-gray-200">
                {currency}
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[80px] text-right bg-white border border-gray-200">
                {data.totals.vatAmount}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-end gap-[4px]">
              <div className="px-2 py-[2px] text-white font-bold min-w-[70px] text-right" style={{ backgroundColor: BLOCK_BLUE }}>
                Total
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[20px] text-center bg-white border border-gray-200">
                {currency}
              </div>
              <div className="px-2 py-[2px] text-gray-900 font-bold min-w-[80px] text-right bg-white border border-gray-200">
                {data.totals.total}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mb-6 text-gray-900">
        <p className="text-center mb-8 font-medium">Please confirm your acceptance of this quote by signing this document</p>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="border-b border-gray-400 h-6"></div>
            <p className="text-gray-400 text-[8px] mt-1">Signature</p>
          </div>
          <div className="flex-1">
            <div className="border-b border-gray-400 h-6"></div>
            <p className="text-gray-400 text-[8px] mt-1">Print Name</p>
          </div>
          <div className="flex-1">
            <div className="border-b border-gray-400 h-6"></div>
            <p className="text-gray-400 text-[8px] mt-1">Date</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center text-gray-900 text-[8px]">
        <h2 className="font-bold text-[9px] mb-1">Thank you for your business!</h2>
        <p className="mb-1">Should you have any enquiries concerning this quote, please contact {data.person.name} on {data.person.tel}</p>
        <div className="border-t border-dotted border-gray-400 my-2"></div>
        <p>{data.address.buildingNumber} {data.address.street}, {data.address.townCity}, {data.address.county}, {data.address.state}, {data.address.zipCode}</p>
        <p>Tel: {data.contact.tel} Fax: {data.contact.fax} E-mail: {data.contact.email} Web: {data.contact.website}</p>
      </div>
    </div>
  );
};