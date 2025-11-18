'use client';

import React from 'react';
import { Home, Building2, Plus, ChevronRight } from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';

type AddressBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddressBottomSheet({ isOpen, onClose }: AddressBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Choose a delivery address
      </h2>

      <div className="space-y-3">
        {/* Home */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
          <div className="flex items-start space-x-3">
            <Home className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Home</h3>
              <p className="text-sm text-gray-600">
                123, Green Valley Apartments, 4th Main Road, HSR Layout, Bangalore - 560102
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Office */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
          <div className="flex items-start space-x-3">
            <Building2 className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Office</h3>
              <p className="text-sm text-gray-600">
                TechPark Solutions Pvt. Ltd., 8th Floor, Tower B, Outer Ring Road, Bangalore
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Add New Address */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 transition cursor-pointer">
          <div className="flex items-center space-x-3">
            <Plus className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-600">Add new Address</span>
          </div>
          <ChevronRight className="w-5 h-5 text-green-600" />
        </div>
      </div>
    </BottomSheet>
  );
}
