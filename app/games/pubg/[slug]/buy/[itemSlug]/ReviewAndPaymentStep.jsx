"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { FiCreditCard, FiSmartphone, FiUser, FiInfo, FiCheck, FiShield } from "react-icons/fi";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/utils/currency";


export default function ReviewAndPaymentStep({
  step,
  setStep,
  itemName,
  itemImage,
  price,
  discount,
  totalPrice,
  userEmail,
  userPhone,
  reviewData,
  walletBalance,
  paymentMethod,
  setPaymentMethod,
  onPaymentComplete,
  slug,
  itemSlug,
}) {
  const [upiQR, setUpiQR] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Default to wallet if balance allows
  useEffect(() => {
    if (walletBalance >= totalPrice && !paymentMethod) {
      setPaymentMethod("wallet");
    }
  }, [walletBalance, totalPrice, paymentMethod, setPaymentMethod]);

  // Generate UPI QR
  const handleUPI = async () => {
    setPaymentMethod("upi");

    const upiId = "yourupi@bank";
    const upiString = `upi://pay?pa=${upiId}&pn=YourStore&am=${totalPrice}&cu=INR`;

    const qr = await QRCode.toDataURL(upiString);
    setUpiQR(qr);
  };

  // Handle proceed to payment
  const handleProceed = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setIsRedirecting(true);

    try {
      const storedPhone = userPhone || localStorage.getItem("phone");
      const orderPayload = {
        gameSlug: slug,
        itemSlug,
        itemName,
        playerId: reviewData.playerId,
        zoneId: "N/A",
        paymentMethod,
        email: userEmail || null,
        phone: storedPhone,
        currency: "INR",
      };

      const token = localStorage.getItem("token");

      const res = await fetch("/api/order/create-gateway-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Order failed: " + data.message);
        setIsRedirecting(false);
        return;
      }

      // Handle wallet payment
      if (data.walletPayment) {
        // Update local wallet balance
        localStorage.setItem("walletBalance", String(data.newWalletBalance));
        window.dispatchEvent(new Event("walletUpdated"));

        // Store order for tracking
        localStorage.setItem("pending_topup_order", data.orderId);

        // Redirect to success page
        window.location.href = `/payment/topup-complete?orderId=${data.orderId}&wallet=true`;
        return;
      }

      // Handle gateway payment
      localStorage.setItem("pending_topup_order", data.orderId);

      // 🚀 redirect to payment gateway
      window.location.href = data.paymentUrl;
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* STEP 2: REVIEW & PAY */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* USER & ACCOUNT DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--accent)]/5 rounded-full blur-2xl -z-10 group-hover:bg-[var(--accent)]/10 transition-all" />
              <h3 className="text-[10px] font-[900] uppercase tracking-widest text-[var(--muted)] mb-3 flex items-center gap-2">
                <FiUser className="text-base" /> User Details
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-[9px] uppercase font-black text-[var(--muted)]/70 tracking-tighter">Email Address</p>
                  <p className="font-bold truncate text-xs">{userEmail || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-[var(--muted)]/70 tracking-tighter">Phone Number</p>
                  <p className="font-bold truncate text-xs">{userPhone || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl -z-10 group-hover:bg-blue-500/10 transition-all" />
              <h3 className="text-[10px] font-[900] uppercase tracking-widest text-[var(--muted)] mb-3 flex items-center gap-2">
                <FiShield className="text-base" /> Game Account
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-[9px] uppercase font-black text-[var(--muted)]/70 tracking-tighter">Username</p>
                  <p className="font-bold text-[var(--accent)] truncate text-xs leading-none mt-0.5">{reviewData.userName}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[9px] uppercase font-black text-[var(--muted)]/70 tracking-tighter">Player ID</p>
                    <p className="font-bold truncate text-xs">{reviewData.playerId}</p>
                  </div>
                  {reviewData.zoneId && (
                    <div>
                      <p className="text-[9px] uppercase font-black text-[var(--muted)]/70 tracking-tighter">Zone ID</p>
                      <p className="font-bold truncate text-xs">{reviewData.zoneId}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="space-y-3">
            <h3 className="text-xs font-[900] uppercase tracking-widest text-[var(--foreground)] flex items-center gap-2">
              <FiCreditCard className="text-base" /> Payment Method
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  if (walletBalance >= totalPrice) setPaymentMethod("wallet");
                }}
                disabled={walletBalance < totalPrice}
                className={`relative p-3.5 rounded-2xl border-2 transition-all text-left group overflow-hidden col-span-full
                             ${paymentMethod === "wallet"
                    ? "bg-[var(--accent)]/10 border-[var(--accent)] ring-1 ring-[var(--accent)]"
                    : "bg-[var(--background)] border-[var(--border)] hover:border-[var(--muted)]"
                  }
                             ${walletBalance < totalPrice ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${paymentMethod === 'wallet' ? 'bg-[var(--accent)] text-black' : 'bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black'}`}>
                      <Wallet size={18} />
                    </div>
                    <div>
                      <span className="font-[900] text-[10px] uppercase tracking-wider block">BlueBuff Wallet</span>
                      <span className="text-[8px] text-[var(--muted)] font-black uppercase">Instant & Secure</span>
                    </div>
                  </div>
                  {paymentMethod === "wallet" && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <FiCheck className="text-black text-[10px] stroke-[4]" />
                    </motion.div>
                  )}
                </div>
                <div className="flex items-baseline gap-2 translate-x-[42px]">
                  <span className="text-lg font-[900] tracking-tight">{formatPrice(walletBalance)}</span>
                  {walletBalance < totalPrice && (
                    <span className="text-[8px] text-red-400 font-black uppercase tracking-tight italic animate-pulse">Insufficient Balance</span>
                  )}
                </div>
              </button>

              {/* UPI Option (Disabled) */}
              <div className="relative p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--background)]/40 opacity-40 cursor-not-allowed grayscale group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <FiSmartphone size={18} />
                  </div>
                  <div>
                    <span className="font-[900] text-[10px] uppercase tracking-wider block">UPI Payment</span>
                    <span className="text-[8px] text-[var(--muted)] font-black uppercase tracking-tight">External App</span>
                  </div>
                </div>
                <div className="absolute top-2.5 right-3 px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[7px] font-black uppercase tracking-widest">
                  Soon
                </div>
              </div>

              {/* PayPal Option (Disabled) */}
              <div className="relative p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--background)]/40 opacity-40 cursor-not-allowed grayscale group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#003087]/10 text-[#003087] flex items-center justify-center">
                    <FiCreditCard size={18} />
                  </div>
                  <div>
                    <span className="font-[900] text-[10px] uppercase tracking-wider block">Cards / PayPal</span>
                    <span className="text-[8px] text-[var(--muted)] font-black uppercase tracking-tight">Global Payments</span>
                  </div>
                </div>
                <div className="absolute top-2.5 right-3 px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[7px] font-black uppercase tracking-widest">
                  Soon
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY & ACTION */}
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 relative overflow-hidden">
            <div className="space-y-1.5 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--muted)] font-bold uppercase tracking-tighter">Subtotal</span>
                <span className="font-black">{formatPrice(price)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--muted)] font-bold uppercase tracking-tighter">Discount</span>
                  <span className="font-black text-green-400">- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="h-px bg-[var(--border)]/50 my-2" />
              <div className="flex justify-between items-center">
                <span className="font-[900] text-base uppercase tracking-widest">Total Pay</span>
                <span className="font-[900] text-xl text-[var(--accent)]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={handleProceed}
              disabled={isRedirecting || !paymentMethod || (paymentMethod === "wallet" && walletBalance < totalPrice)}
              className="w-full py-4 rounded-xl bg-[var(--accent)] text-black font-[900] uppercase tracking-widest hover:shadow-[0_0_20px_var(--accent)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3 overflow-hidden group/btn"
            >
              {isRedirecting ? (
                <>
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Pay</span>
                  <FiCheck className="text-lg transition-transform group-hover/btn:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: QR CODE DISPLAY */}
      {step === 3 && paymentMethod === "upi" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSmartphone className="text-3xl text-[var(--accent)]" />
          </div>
          <h3 className="text-xl font-[900] uppercase tracking-wide mb-2">Scan to Pay</h3>
          <p className="text-[var(--muted)] text-sm mb-6">Use any UPI app to scan and pay safely.</p>

          <div className="w-64 h-64 mx-auto bg-white p-4 rounded-2xl shadow-xl mb-8">
            {upiQR ? (
              <Image src={upiQR} alt="UPI QR" width={250} height={250} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black/50 text-sm font-bold animate-pulse">
                Generating QR...
              </div>
            )}
          </div>

          <button
            onClick={onPaymentComplete}
            className="w-full py-4 rounded-xl bg-[var(--accent)] text-black font-[900] uppercase tracking-widest hover:shadow-[0_0_20px_var(--accent)] transition-all"
          >
            I Have Completed Payment
          </button>
        </motion.div>
      )}
    </div>
  );
}
