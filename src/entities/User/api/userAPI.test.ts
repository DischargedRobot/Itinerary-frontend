import { userAPI } from "./userAPI"

jest.mock("./userAPI")

const mockGetMe = userAPI.getMe as jest.MockedFunction<typeof userAPI.getMe>

describe("userAPI", () => {
	const mockGetMeResponse = {
		id: 1,
		login: "testuser",
		password: "password",
		name: "Test",
		secondName: "User",
		middleName: "Middle",
		email: "testuser@example.com",
		phoneNumber: "1234567890",
	}

	mockGetMe.mockResolvedValue(mockGetMeResponse)
	// const spy = jest
	// 	.spyOn(userAPI, "getMe")
	// 	.mockResolvedValue(mockGetMeResponse)

	it("get me", async () => {
		const response = await mockGetMe()
		expect(response).toEqual(mockGetMeResponse)
		expect(mockGetMe).toHaveBeenCalled()
	})
})
