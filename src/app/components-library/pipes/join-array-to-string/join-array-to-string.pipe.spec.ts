import { JoinArrayToStringPipe } from "./join-array-to-string.pipe";

describe("JoinArrayToStringPipe", () => {
    let pipe: JoinArrayToStringPipe;

    beforeEach(() => {
        pipe = new JoinArrayToStringPipe();
    });

    it("should create the pipe", () => {
        expect(pipe).toBeTruthy();
    });

    it("should transform array to a comma separated string by default", () => {
        const result = pipe.transform(["rock", "pop", "hip hop"]);
        expect(result).toBe("rock, pop, hip hop");
    });

    it('should return "Unknown" for an empty array', () => {
        const result = pipe.transform([]);
        expect(result).toBe("Unknown");
    });

    it("should transform array to a string with custom separator", () => {
        const result = pipe.transform(["rock", "pop", "hip hop"], " | ");
        expect(result).toBe("rock | pop | hip hop");
    });

    it("should handle array with one element", () => {
        const result = pipe.transform(["rock"]);
        expect(result).toBe("rock");
    });

    it("should handle array with multiple empty strings", () => {
        const result = pipe.transform(["", "", ""]);
        expect(result).toBe(", , ");
    });
});
