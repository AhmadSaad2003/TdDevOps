// src/function.spec.ts
import si from 'systeminformation';
import { getCpuInfo, getMemoryInfo, buildResponse } from './index'; // Adjust based on your file structure

// Mocking the systeminformation module for unit tests
jest.mock('systeminformation');

// Unit tests for functions
describe('Function Tests', () => {
    it('should return CPU information', async () => {
        // Mock the return value of the si.cpu() function
        (si.cpu as jest.Mock).mockResolvedValue({
            manufacturer: 'Intel',
            brand: 'Core i7',
            cores: 8,
            speed: 3.5,
        });

        const cpuInfo = await getCpuInfo();
        expect(cpuInfo).toEqual({
            model: 'Intel Core i7',
            cores: 8,
            speed: 3.5,
        });
    });

    it('should return memory information', async () => {
        // Mock the return value of the si.mem() function
        (si.mem as jest.Mock).mockResolvedValue({
            total: 16 * 1024 ** 3, // 16 GB
            used: 8 * 1024 ** 3,   // 8 GB
        });

        const memoryInfo = await getMemoryInfo();
        expect(memoryInfo).toEqual({
            total: 16, // Total in GB
            used: 8,   // Used in GB
        });
    });

    it('should build the response correctly', async () => {
        // Mock the CPU and memory functions
        (si.cpu as jest.Mock).mockResolvedValue({
            manufacturer: 'Intel',
            brand: 'Core i7',
            cores: 8,
            speed: 3.5,
        });
        (si.mem as jest.Mock).mockResolvedValue({
            total: 16 * 1024 ** 3, // 16 GB
            used: 8 * 1024 ** 3,   // 8 GB
        });

        const response = await buildResponse();
        expect(response).toEqual({
            cpu: {
                model: 'Intel Core i7',
                cores: 8,
                speed: 3.5,
            },
            memory: {
                total: 16,
                used: 8,
            },
        });
    });
});
