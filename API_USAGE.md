# bluebuff.in Service API Guide

This guide explains how to use the bluebuff.in Service API to integrate top-up services into your own applications. This feature is exclusively available to **Members** and **Owners**.

---

## 1. Authentication & Headers

Every request to the Service API requires authentication. 

**Required Headers:**
```http
x-api-key: TK_your_generated_api_key_here
Content-Type: application/json
```

> **Security Note:** User details (email, phone, etc.) are automatically retrieved from the account linked to your API key. There is no need to send these in order requests.

---

## 2. API Endpoints

### 💰 Check Wallet Balance
Check your current wallet balance and user profile.
*   **URL:** `/api/service/balance`
*   **Method:** `GET`

### 🔍 Browse Games (List)
Get a list of all available games and services.
*   **URL:** `/api/service/games`
*   **Method:** `GET`

### 🎮 Get Game Details (Items & Prices)
Get a list of items and their **member-specific prices** for a specific game.
*   **URL:** `/api/service/games/{gameSlug}`
*   **Method:** `GET`

> [!IMPORTANT]
> **Mobile Legends (MLBB) Region Restrictions:**
> Regional blocking (blocking **INDO, ID, PH, SG, RU, MY, MM**) applies **only** to the following products:
> *   `mobile-legends988`
> *   `mlbb-double332`
> *   `weeklymonthly-bundle931`
> Other MLBB products can be ordered globally. Always call the validation endpoint to verify the player's region before ordering.

### 🛡️ ID & Region Check
Verify a Player ID/Zone ID and check account region before ordering. This endpoint now uses a dual-verification system (Universal Name Check + Regional Check).
*   **URL:** `/api/service/validate`
*   **Method:** `POST`
*   **Body:** `{"gameSlug": "...", "playerId": "...", "zoneId": "...", "itemSlug": "..."}`
*   **Sample Response:**
    ```json
    {
      "success": 200,
      "message": "Validation successful",
      "data": {
        "username": "ProPlayer",
        "region": "Global",
        "playerId": "12345678",
        "zoneId": "1234"
      }
    }
    ```

### 🚀 Place Order
Place a top-up order. Funds are temporarily deducted and auto-executed.
*   **URL:** `/api/service/order`
*   **Method:** `POST`
*   **Body:** `{"gameSlug": "...", "itemSlug": "...", "playerId": "...", "zoneId": "..."}`
*   **Note:** If fulfillment fails, the **full amount is instantly refunded** to your wallet. 
*   **Validation:** Orders for MLBB will be automatically blocked if the player is in a restricted region or if identification fails.

---

## 3. Implementation Flow
1. **List Games**: call `/api/service/games` to find the `gameSlug`.
2. **Get Prices**: call `/api/service/games/{slug}` to get `itemSlug` and the exact price you will be charged.
3. **Verify ID**: call `/api/service/validate` to confirm user identity and check region eligibility (especially for MLBB).
4. **Order**: call `/api/service/order` to complete the transaction.
