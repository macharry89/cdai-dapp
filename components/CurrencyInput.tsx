import NumberFormat from 'react-number-format';
import Image from 'next/image';
import DaiImg from '/assets/img/dai.svg';

const CurrencyInput = ({
  value,
  maxValue,
  onChange,
}: {
  value: string;
  maxValue?: number;
  onChange: (value: string) => void;
}) => {

  return (
    <div className="wallet-currency-input">
      <NumberFormat
        value={value}
        thousandSeparator={true}
        isNumericString
        allowNegative={false}
        fixedDecimalScale
        isAllowed={({ floatValue }) =>
          floatValue && maxValue ? floatValue <= maxValue : true
        }
        placeholder="0.00"
        onValueChange={({ value }) => onChange(value)}
      />
      <div
        className="wallet-currency-input-symbol"
      >
        <div className="coin-image">
          <Image
            src={DaiImg}
            alt="DAI"
          />
          </div>
        <span>DAI</span>
      </div>
    </div>
  );
};

export default CurrencyInput;
