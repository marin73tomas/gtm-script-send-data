![](https://gamesmith.com/favicon-96x96.png)
# 📈 Analytics API `getStats`

<br>

# `GET` Specific Maker Analytics
## Get analytics on specific maker.

**Example Request:**
`getStats?PageType=maker&PageId=12345&StartDate=2020-02-01`

**Example Query Parameters**
`PageType`: maker
`PageId` (**MakerID**): 12345
`StartDate`: 2020-02-01

**Example Response:**
```json
{
	"totalViews": { "count": 445, "time": 40500 },
	"viewedByMakers": [32467, 98324, 12398],
	"viewedByStudioList": ["king", "sony", "blizzard"]
}
```

---
# `GET` Specific Job Analytics
## Get analytics on specific job.

**Example Request:**
`getStats?PageType=job&PageId=12345&StartDate=2020-02-01`

**Example Query Parameters**
`PageType`: job
`PageId` (**JobID**): 12345
`StartDate`: 2020-02-01

**Example Response:**
```json
{
	"totalViews": { "count": 445, "time": 40500 },
	"viewedByMakers": [32467, 98324, 12398]
}
```
---

# `GET` Specific Studio Analytics
## Get analytics on specific studio.

**Example Request:**
`getStats?PageType=studio&StudioOwner=blizzard&StartDate=2020-02-01`

**Example Query Parameters**
`PageType`: studio
`StudioOwner` (**StudioID**): blizzard
`StartDate`: 2020-02-01

**Example Response:**
```json
{
	"totalViews": { "count": 445, "time": 40500 },
	"viewedByMakers": [32467, 98324, 12398]
}
```
---

# `GET` Job Postings For Specific Studio Analytics
## Get analytics on job postings belonging to specific studio.

**Example Request:**
`getStats?PageType=studioJobs&StudioOwner=blizzard&StartDate=2020-02-01`

**Example Query Parameters**
`PageType`: studioJobs
`StudioOwner` (**StudioID**): blizzard
`StartDate`: 2020-02-01

**Example Response:**
```json
{
	"totalViews": { "count": 445, "time": 40500 },
	"viewedByMakers": [32467, 98324, 12398]
}
```