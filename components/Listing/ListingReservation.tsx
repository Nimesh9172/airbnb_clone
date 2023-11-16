"use client";

import { Range } from "react-date-range";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Calendar from "../Input/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const formattedPrice = price.toLocaleString("en");
  const formattedTotalPrice = totalPrice.toLocaleString("en");

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold flex flex-row items-center">
          <FaIndianRupeeSign size={13} /> <span>{formattedPrice}</span>
        </div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div className="flex flex-row items-center">
          {" "}
          <FaIndianRupeeSign size={13} /> {formattedTotalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
