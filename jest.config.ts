// jest.config.ts
import type { Config } from "jest"

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFilesAfterEnv: ["./jest.setup.ts"],
}

export default config
