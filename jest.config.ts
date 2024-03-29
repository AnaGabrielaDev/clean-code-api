import type { Config } from "jest"

const config: Config = {
	roots: ["<rootDir>/src"],
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	preset: "@shelf/jest-mongodb",
	transform: {
		".+\\.ts$": "ts-jest",
	},
}

export default config
