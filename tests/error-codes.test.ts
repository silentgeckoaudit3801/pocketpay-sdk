import { describe, expect, it } from 'vitest';
import {
  POCKETPAY_ERROR_CODE_CATEGORIES,
  POCKETPAY_ERROR_CODES,
  isPocketPayErrorCode,
  type PocketPayErrorCode,
} from '../src';

describe('public PocketPay error code standard', () => {
  it('exports stable codes for common SDK failure categories', () => {
    expect(POCKETPAY_ERROR_CODES.INVALID_PUBLIC_KEY).toBe('INVALID_PUBLIC_KEY');
    expect(POCKETPAY_ERROR_CODES.PAYMENT_FAILED).toBe('PAYMENT_FAILED');
    expect(POCKETPAY_ERROR_CODES.TX_STATUS_UNKNOWN).toBe('TX_STATUS_UNKNOWN');
    expect(POCKETPAY_ERROR_CODES.MISSING_TRUSTLINE).toBe('MISSING_TRUSTLINE');
    expect(POCKETPAY_ERROR_CODES.VAULT_DEPOSIT_ERROR).toBe('VAULT_DEPOSIT_ERROR');
  });

  it('groups codes by broad handling category', () => {
    expect(POCKETPAY_ERROR_CODE_CATEGORIES.validation).toContain(
      POCKETPAY_ERROR_CODES.INVALID_AMOUNT,
    );
    expect(POCKETPAY_ERROR_CODE_CATEGORIES.network).toContain(
      POCKETPAY_ERROR_CODES.TX_STATUS_UNKNOWN,
    );
    expect(POCKETPAY_ERROR_CODE_CATEGORIES.trustline).toContain(
      POCKETPAY_ERROR_CODES.TRUSTLINE_LIMIT_EXCEEDED,
    );
  });

  it('narrows arbitrary strings to public error codes', () => {
    const code: string = 'PAYMENT_FAILED';
    expect(isPocketPayErrorCode(code)).toBe(true);

    if (isPocketPayErrorCode(code)) {
      const typed: PocketPayErrorCode = code;
      expect(typed).toBe(POCKETPAY_ERROR_CODES.PAYMENT_FAILED);
    }

    expect(isPocketPayErrorCode('payment failed')).toBe(false);
  });
});