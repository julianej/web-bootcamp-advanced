## API Documentation

The Trail Guide provides a JSON REST API for retrieving, creating, updating and deleting trails.

### Base URL

```text
http://localhost:3000/api
```

### API Endpoints

| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | `/api/trails` | Get all trails, including region information | `200 OK` |
| GET | `/api/trails/:slug` | Get a single trail by slug | `200 OK` |
| GET | `/api/regions` | Get all regions | `200 OK` |
| GET | `/api/regions/:slug/trails` | Get all trails belonging to a region | `200 OK` |
| POST | `/api/trails` | Create a new trail | `201 Created` |
| PUT | `/api/trails/:id` | Replace an existing trail | `200 OK` |
| DELETE | `/api/trails/:id` | Delete a trail | `204 No Content` |

### Authentication

Read endpoints (`GET`) are publicly accessible.

Write endpoints (`POST`, `PUT`, `DELETE`) require an API key.

Include the following header in write requests:

```http
x-api-key: YOUR_API_KEY
```

The API key is configured in the `.env` file:

```env
API_KEY=your-secret-api-key
```

Requests without a valid API key receive a `401 Unauthorized` response.

### Request Body

The `POST` and `PUT` endpoints expect a JSON request body with the following fields:

| Field | Type | Description |
|---|---|---|
| `name` | String | Trail name |
| `region_id` | Number | ID of the associated region |
| `description` | String | Trail description |
| `image` | String | Trail image URL |
| `distance_km` | Number | Trail distance in kilometres |
| `elevation_m` | Number | Elevation gain in metres |
| `difficulty` | String | Trail difficulty: `easy`, `moderate` or `hard` |

Example:

```json
{
  "name": "Ben Nevis Mountain Track",
  "region_id": 1,
  "description": "A challenging mountain hike.",
  "image": "https://example.com/ben-nevis.jpg",
  "distance_km": 17,
  "elevation_m": 1345,
  "difficulty": "hard"
}
```

### Expected API Responses

**Successful responses**

| Method | Endpoint | Status |
|---|---|---|
| GET | `/api/trails` | `200 OK` |
| GET | `/api/trails/:slug` | `200 OK` |
| GET | `/api/regions` | `200 OK` |
| GET | `/api/regions/:slug/trails` | `200 OK` |
| POST | `/api/trails` | `201 Created` |
| PUT | `/api/trails/:id` | `200 OK` |
| DELETE | `/api/trails/:id` | `204 No Content` |

**Error responses**

| Status | Situation |
|---|---|
| `400 Bad Request` | Missing required fields, invalid difficulty or non-existent region |
| `401 Unauthorized` | Missing or incorrect API key |
| `404 Not Found` | Requested trail or region does not exist |

Error responses return a JSON object containing an error message.

Example:

```json
{
  "error": "Trail not found."
}
```

### Validation

The API validates incoming `POST` and `PUT` requests:

- All required fields must be provided.
- Difficulty must be `easy`, `moderate` or `hard`.
- `region_id` must reference an existing region.
- Numeric fields must contain valid numbers.

Invalid requests receive a `400 Bad Request` response.

### Content Type

Write requests must use:

```http
Content-Type: application/json
```