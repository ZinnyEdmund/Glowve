import { useState } from "react";
import type { PaymentMethod } from "../../types";
import { PAYMENT_METHODS } from "../../utils/constants";
import { Lightbulb, Info, Lock, ArrowLeft } from "lucide-react";

type CardDetails = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  // icon: string;
};

type Props = {
  onSubmit: (method: PaymentMethod, cardDetails?: CardDetails) => Promise<void>;
  onBack: () => void;
  processing?: boolean;
};

export default function PaymentForm({
  onSubmit,
  onBack,
  processing = false,
}: Props) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("paystack");
const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === "card") {
      onSubmit(selectedMethod, cardDetails);
    } else {
      onSubmit(selectedMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

      {/* Payment Methods */}
      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          return (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedMethod === method.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) =>
                  setSelectedMethod(e.target.value as PaymentMethod)
                }
                className="w-5 h-5 text-blue-600"
              />
              <Icon className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-900">{method.name}</span>
            </label>
          );
        })}
      </div>

      {/* Card Details (if card selected) */}
      {selectedMethod === "card" && (
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#755757] outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#755757] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                placeholder="123"
                maxLength={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#755757] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardDetails.cardholderName}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardholderName: e.target.value })
              }
              placeholder="JOHN DOE"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#755757] outline-none"
              required
            />
          </div>
        </div>
      )}

      {/* Paystack Info */}
      {selectedMethod === "paystack" && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 flex-0 mt-0.5" />
            <span>
              <span className="font-semibold">Secure Payment:</span> You'll be
              redirected to Paystack's secure payment page to complete your
              transaction.
            </span>
          </p>
        </div>
      )}

      {/* Bank Transfer Info */}
      {selectedMethod === "bank_transfer" && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 flex items-start gap-2">
            <Info className="w-4 h-4 flex-0 mt-0.5" />
            <span>
              <span className="font-semibold">Note:</span> Bank transfer details
              will be provided after you place your order.
            </span>
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={processing}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={processing}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Place Order
            </>
          )}
        </button>
      </div>
    </form>
  );
}
