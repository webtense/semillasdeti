import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLeads, addLead } from '../leads';

vi.mock('node:fs/promises', async () => {
	const mockLeads: Array<{ email: string; firstName: string; registeredAt: string }> = [];
	return {
		mkdir: vi.fn().mockResolvedValue(undefined),
		readFile: vi.fn().mockImplementation(async (path) => {
			if (String(path).includes('leads.json')) {
				return JSON.stringify(mockLeads);
			}
			throw new Error('File not found');
		}),
		writeFile: vi.fn().mockImplementation(async (path, data) => {
			if (String(path).includes('leads.json')) {
				const parsed = JSON.parse(String(data));
				mockLeads.length = 0;
				mockLeads.push(...parsed);
			}
			return undefined;
		}),
	};
});

describe('leads.ts', () => {
	beforeEach(() => {
		vi.resetModules();
	});

	describe('getLeads', () => {
		it('should return empty array when no leads exist', async () => {
			const leads = await getLeads();
			expect(leads).toEqual([]);
		});
	});

	describe('addLead', () => {
		it('should add a new lead', async () => {
			const lead = await addLead('test@example.com', 'Test User');
			expect(lead.email).toBe('test@example.com');
			expect(lead.firstName).toBe('Test User');
			expect(lead.registeredAt).toBeDefined();
		});

		it('should lowercase email', async () => {
			const lead = await addLead('TEST@Example.COM', 'Test');
			expect(lead.email).toBe('test@example.com');
		});

		it('should not duplicate existing email', async () => {
			await addLead('duplicate@example.com', 'First');
			const lead = await addLead('Duplicate@Example.com', 'Second');
			expect(lead.email).toBe('duplicate@example.com');
			expect(lead.firstName).toBe('First');
		});
	});
});