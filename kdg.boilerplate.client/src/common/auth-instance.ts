// MSAL imports
import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "../authConfig"

export class AuthInstance {
    static #instance: AuthInstance;

    // TODO:  Add private properties for you authentication instance here.
    msalInstance: PublicClientApplication;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {

        // TODO:  Initiale your authentication instance here.
        this.msalInstance = new PublicClientApplication(msalConfig);

        this.msalInstance.initialize().then(() => {
            // Default to using the first account if no account is active on page load
            if (!this.msalInstance.getActiveAccount() && this.msalInstance.getAllAccounts().length > 0) {
              // Account selection logic is app dependent. Adjust as needed for different use cases.
              this.msalInstance.setActiveAccount(this.msalInstance.getAllAccounts()[0]);
            }
          
            // Optional - This will update account state if a user signs in from another tab or window
            this.msalInstance.enableAccountStorageEvents();
          
            this.msalInstance.addEventCallback((event) => {
              if (event.eventType === EventType.LOGIN_SUCCESS
                ||
                event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
                ||
                event.eventType === EventType.SSO_SILENT_SUCCESS
              ) {
                if (event.payload) {
                    const account = (event.payload as AuthenticationResult).account;
                    this.msalInstance.setActiveAccount(account);
                }
              }
            });
        });
    }

    /**
     * The static getter that controls access to the singleton instance.
     *
     * This implementation allows you to extend the Singleton class while
     * keeping just one instance of each subclass around.
     */
    public static get instance(): AuthInstance {
        if (!AuthInstance.#instance) {
            AuthInstance.#instance = new AuthInstance();
        }

        return AuthInstance.#instance;
    }

    // TODO: Add public getters for your authentication instance here.
    public getMsalInstance(): PublicClientApplication {
        return this.msalInstance;
    }
}