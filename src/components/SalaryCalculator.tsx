"use client";

import { useState, useEffect } from "react";
import salaryData from "@/data/salary-data.json";

export default function SalaryCalculator() {
  const [selectedPost, setSelectedPost] = useState("");
  const [cityType, setCityType] = useState("xCity");
  const [experience, setExperience] = useState(0);
  const [includePerks, setIncludePerks] = useState(false);

  const posts = salaryData.posts;
  const allowances = salaryData.allowances;
  const deductions = salaryData.deductions;

  const selectedPostData = posts.find((p) => p.id === selectedPost);

  const calculateSalary = () => {
    if (!selectedPostData) return null;

    const incrementKey = `${experience}years` as keyof typeof selectedPostData.basicPay.afterIncrements;
    const basicPay = (selectedPostData.basicPay.afterIncrements as Record<string, number> | undefined)?.[incrementKey] ?? selectedPostData.basicPay.entry;
    const da = (basicPay * allowances.da) / 100;
    const hra = (basicPay * (allowances.hra as Record<string, number>)[cityType]) / 100;
    const ta = (allowances.ta as Record<string, number>)[cityType === "xCity" ? "metro" : "nonMetro"];

    const gross = basicPay + da + hra + ta;
    const npsDeduction = (basicPay * deductions.nps) / 100;
    const netInHand = gross - npsDeduction - deductions.professionalTax;

    const perksValue = includePerks ? selectedPostData.perks.housingValue || 0 : 0;
    const totalCtc = netInHand + perksValue;

    return {
      basicPay,
      da,
      hra,
      ta,
      gross,
      npsDeduction,
      netInHand,
      perksValue,
      totalCtc,
    };
  };

  const salary = calculateSalary();

  const shareText = selectedPostData
    ? `My dream job: ${selectedPostData.name} pays ₹${Math.round(salary?.netInHand || 0).toLocaleString()} per month in-hand! Calculate yours at prepkar.vercel.app/salary-calculator`
    : "Calculate your government job salary at prepkar.vercel.app/salary-calculator";

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Step 1: Job Post Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Job Post
        </label>
        <select
          value={selectedPost}
          onChange={(e) => setSelectedPost(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a job post...</option>
          {posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.name} ({post.category})
            </option>
          ))}
        </select>
      </div>

      {/* Step 2: City Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City Type
        </label>
        <div className="flex gap-4">
          {[
            { value: "xCity", label: "X City (Delhi, Mumbai)", percent: "30%" },
            { value: "yCity", label: "Y City (Pune, Jaipur)", percent: "20%" },
            { value: "zCity", label: "Z City (Others)", percent: "10%" },
          ].map((city) => (
            <label key={city.value} className="flex items-center">
              <input
                type="radio"
                value={city.value}
                checked={cityType === city.value}
                onChange={(e) => setCityType(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">{city.label} (HRA {city.percent})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Step 3: Experience */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience: {experience} years
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="1"
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>3</span>
          <span>7</span>
          <span>14</span>
          <span>20</span>
          <span>30</span>
        </div>
      </div>

      {/* Step 4: Include Perks */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includePerks}
            onChange={(e) => setIncludePerks(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">
            Include estimated perks value
          </span>
        </label>
      </div>

      {/* Output Card */}
      {salary && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Salary Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Basic Pay:</span>
              <span>₹{Math.round(salary.basicPay).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Dearness Allowance ({allowances.da}%):</span>
              <span>₹{Math.round(salary.da).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>HRA ({(allowances.hra as Record<string, number>)[cityType]}%):</span>
              <span>₹{Math.round(salary.hra).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Transport Allowance:</span>
              <span>₹{Math.round(salary.ta).toLocaleString()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Gross Salary:</span>
              <span>₹{Math.round(salary.gross).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Less: NPS ({deductions.nps}%):</span>
              <span>-₹{Math.round(salary.npsDeduction).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Less: Professional Tax:</span>
              <span>-₹{deductions.professionalTax}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>NET IN-HAND SALARY:</span>
              <span>₹{Math.round(salary.netInHand).toLocaleString()}</span>
            </div>
          </div>

          {includePerks && selectedPostData && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-semibold mb-2">Perks & Benefits</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Housing benefit value:</span>
                  <span>₹{Math.round(salary.perksValue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medical coverage:</span>
                  <span>{selectedPostData.perks.medical}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other benefits:</span>
                  <span>{selectedPostData.perks.vehicle}, {selectedPostData.perks.ltc ?? selectedPostData.perks.lfc}, {selectedPostData.perks.pension}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-blue-600">
                  <span>TOTAL CTC (including perks):</span>
                  <span>₹{(salary.totalCtc / 100000).toFixed(1)} LPA</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Share Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleShare}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Share Calculator
        </button>
      </div>

      {/* Comparison Note */}
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-blue-800">
          💡 Did you know? An entry-level IAS officer's total compensation (including perks) equals ₹25-30 LPA in private sector terms!
        </p>
      </div>
    </div>
  );
}