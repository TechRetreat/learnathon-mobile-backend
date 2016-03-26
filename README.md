# learnathon-mobile-backend
The backend for the mobile application used in the Mobile stream for learnathon

# Usage
Endpoint: https://pacific-shelf-86847.herokuapp.com/

## Schemas
### Cache
```
{
  name: String,
  description: String,
  difficulty: Number,
  location: {
    latitude: Number,
    longitude: Number
  }
}
```
**Name** - name of cache
**Description** - description of cache
**Difficulty** - how hard it is to find the cache
**Location** - lat/long pair specifiying the location

### User
```
{
  name: String,
  found_caches: [
    {
      cache_id: Schema.Types.ObjectId,
      found: Date
  ]
}
```
**Name** - name of user
**Found caches** - list of cache + timestamp pairs of when users found certain caches

## API
`GET` @ `/cahces`
*Response* - Array of all cache objects

`POST` @ `/caches`
Sample params:
```
{
  "name":"Another cache object",
  "description":"Wat? Another description?",
  "difficulty":10,
  "location": {
    "longitude":12,
    "latitude":34
  }
}
```

Sample response:
```

```
