import { TestBed } from "@angular/core/testing";
import { loginGuard } from "./login-guard";
import { CanActivateFn } from "@angular/router";

describe('loginGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});