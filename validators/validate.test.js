import { describe, it, expect } from 'vitest';
import { validate, validateStatus } from './validate.js';

describe('validateStatus', () => {
  it('returns true for valid statuses', () => {
    expect(validateStatus('Uncompleted')).toBe(true);
    expect(validateStatus('Completed')).toBe(true);
    expect(validateStatus('Pending')).toBe(true);
    expect(validateStatus('Deleted')).toBe(true);
  });

  it('returns false for invalid status', () => {
    expect(validateStatus('Invalid')).toBe(false);
    expect(validateStatus(null)).toBe(false);
  });
});

describe('validate', () => {
  it('returns true for valid input with subTasks', () => {
    const input = {
      description: 'Main task',
      status: 'Completed',
      subTasks: [
        { status: 'Pending', description: 'Sub 1' },
        { status: 'Uncompleted', description: 'Sub 2' },
      ],
    };
    expect(validate(input)).toBe(true);
  });

  it('returns false if description is missing', () => {
    const input = {
      status: 'Completed',
      subTasks: [],
    };
    expect(validate(input)).toBe(false);
  });

  it('returns false if status is invalid', () => {
    const input = {
      description: 'Main task',
      status: 'InvalidStatus',
      subTasks: [],
    };
    expect(validate(input)).toBe(false);
  });

  it('returns false if a subtask is missing status', () => {
    const input = {
      description: 'Main task',
      status: 'Pending',
      subTasks: [
        { description: 'Sub 1' },
      ],
    };
    expect(validate(input)).toBe(false);
  });

  it('returns false if a subtask is missing description', () => {
    const input = {
      description: 'Main task',
      status: 'Pending',
      subTasks: [
        { status: 'Completed' },
      ],
    };
    expect(validate(input)).toBe(false);
  });

  it('returns false if a subtask has invalid status', () => {
    const input = {
      description: 'Main task',
      status: 'Pending',
      subTasks: [
        { status: 'Wrong', description: 'Sub' },
      ],
    };
    expect(validate(input)).toBe(false);
  });

  it('returns true when subTasks is not provided', () => {
    const input = {
      description: 'Main task',
      status: 'Completed',
    };
    expect(validate(input)).toBe(true);
  });
});
