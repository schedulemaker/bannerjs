# BannerJS

This NodeJS library provides a simple API to retrieve information from Ellucian Banner.
BannerJS comes with various configurations for different universities (see the full list of supported universities [here](https://github.com/schedulemaker/bannerjs/wiki/Supported-Universities)). Submissions for new university configurations are always welcome. Please read the [config guidelines](https://github.com/schedulemaker/bannerjs/wiki/University-Config-Guidelines) and submit a pull request.

## Creating a new instance

When createing a new `Banner` instance, pass the name of [one of the supported universites](https://github.com/schedulemaker/bannerjs/wiki/Supported-Universities).

```
var Banner = require('banner');
var banner = new Banner('temple');
```

## Methods

**Note:** all methods are `async` and return a `Promise` unless stated otherwise.

#### About pagination:

Banner paginates results, so there are a number of ways fo obtaining some or all results for a given category. There are a few arguments that control this:

`offset` refers to the page number of the results (i.e. the 3rd set of 10 results).
`pageSize`/`max` refer to the number of results per page.

For example, to get 100 entries, you can make:

- 1 request with `offset` of `0` and `pageSize`/`max` of `100`
- 10 requests with `offset` from `[0-9]` and `pageSize`/`max` of `10`

### getTerms({term, offset=1, max=-1})

Returns an array of terms.

```

const terms = await banner.getTerms();
[
    {
        code: <String>,
        description: <String>
    }
]
```

### getSubjects({term, offset=1, max=-1})

Returns an array of subjects.

```
const args = {term: 202036}
const subjects = await banner.getSubjects(args);
[
    {
        code: <String>,
        description: <String>
    }
]
```

### getInstructors({term})

Returns an array of instructors.

```
const args = {term: 202036}
const instructors = await banner.getInstructors(args);
[
    {
        code: <String>,
        description: <String>
    }
]
```

### getCampuses()

Returns an array of campuses.

```
const campuses = await banner.getCampuses();
[
    {
        code: <Number>,
        description: <String>
    }
]
```

### getColleges()

Returns an array of schools and colleges.

```
const colleges = await banner.getColleges();
[
    {
        code: <Number>,
        description: <String>
    }
]
```

### getAttributes()

Returns an array of course attributes.

```
const attributes = await banner.getAttributes();
[
    {
        code: <Number>,
        description: <String>
    }
]
```

### getSessions()

Returns an array of sessions.

```
const sessions = await banner.getSessions();
[
    {
        code: <Number>,
        description: <String>
    }
]
```

### getPartsOfTerm()

Returns an array of campuses.

```
const partsOfTerm = await banner.getPartsOfTerm();
[
    {
        code: <Number>,
        description: <String>
    }
]
```

### getInstructionalMethods()

Returns an array of instructional methods.

```
const instructionalMethods = await banner.getInstructionalMethods();
[
    {
        code: <Number>,
        description: <String>
    }
]
```

### classSearch({term, subject, pageSize=-1, offset=0, openOnly=false})

Returns an array of course sections, along with the total number of sections found for the given request.

```
const args = {
    term: 202036,
    subject: 'CIS'
};
const sections = await banner.classSearch(args);
{
    totalCount: <Number>,
    data: [
        {
            "id": <Number>,
            "term": <String>,
            "termDesc": <String>,
            "courseReferenceNumber": <String>,
            "partOfTerm": <String>,
            "courseNumber": <String>,
            "subject": <String>,
            "subjectDescription": <String>,
            "sequenceNumber": <String>,
            "campusDescription": <String>,
            "scheduleTypeDescription": <String>,
            "courseTitle": <String>,
            "creditHours": null,
            "maximumEnrollment": <Number>,
            "enrollment": <Number>,
            "seatsAvailable": <Number>,
            "waitCapacity": <Number>,
            "waitCount": <Number>,
            "waitAvailable": <Number>,
            "crossList": null,
            "crossListCapacity": null,
            "crossListCount": null,
            "crossListAvailable": null,
            "creditHourHigh": <Number> | null,
            "creditHourLow": <Number | null>,
            "openSection": <Boolean>,
            "isSectionLinked": <Boolean>,
            "subjectCourse": <String>,
            "faculty": [
                {
                    "bannerId": <String>,
                    "displayName": <String>,
                    "emailAddress": <String>,
                    "primaryIndicator": <Boolean>,
                    ...
                }
            ],
            "meetingsFaculty": [
                {
                    "category": <String>,
                    "meetingTime": {
                        "beginTime": <String>,
                        "building": <String>,
                        "buildingDescription": <String>,
                        "campus": <String>,
                        "campusDescription": <String>,
                        "category": <String>,
                        "creditHourSession": <Number>,
                        "endDate": <String>,
                        "endTime": <String>,
                        "friday": <Boolean>,
                        "hoursWeek": <Number>,
                        "meetingScheduleType": <String>,
                        "meetingType": <String>,
                        "meetingTypeDescription": <String>,
                        "monday": <Boolean>,
                        "room": <String>,
                        "saturday": <Boolean>,
                        "startDate": <String>,
                        "sunday": <Boolean>,
                        "term": <String>,
                        "thursday": <Boolean>,
                        "tuesday": <Boolean>,
                        "wednesday": <Boolean>,
                        ...
                    },
                    "term": <String>,
                    ...
                }
            ],
            "reservedSeatSummary": <Number | null>,
            "sectionAttributes": [
                {
                    "code": <String>,
                    "description": <String>,
                    "isZTCAttribute": <Boolean>,
                    ...
                }
            ],
            "bookstores": [
                {
                    "url": <String>,
                    ...
                }
            ],
            "feeAmount": <String | null>
        },
        ...
    ]
    ...
}
```

### catalogSearch({term, subject, offset=0, pageSize=-1})

Returns an array of course catalog entries, along with the total number of entries found for the given request.

**Note:** Banner will return entries for courses not being offered in the given term, so this is not a reliable way to determine courses being offered.

```
const args = {
    term: 202036,
    subject: 'CIS'
};
const entries = await banner.catalogSearch(args);
{
    totalCount: <Number>,
    data: [
        {
            "id": <Number>,
            "termEffective": <String>,
            "courseNumber": <String>,
            "subject": <String>,
            "subjectCode": <String>,
            "college": <String>,
            "collegeCode": <String>,
            "department": <String>,
            "departmentCode": <String>,
            "courseTitle": <String>,
            "durationUnit": null,
            "numberOfUnits": null,
            "attributes": <String[] | null>,
            "gradeModes": null,
            "ceu": null,
            "courseScheduleTypes": null,
            "courseLevels": null,
            "creditHourHigh": null,
            "creditHourLow": <Number>,
            "creditHourIndicator": null,
            "lectureHourLow": null,
            "lectureHourHigh": null,
            "lectureHourIndicator": null,
            "billHourLow": <Number>,
            "billHourHigh": null,
            "billHourIndicator": null,
            "labHourLow": null,
            "labHourHigh": null,
            "labHourIndicator": null,
            "otherHourLow": null,
            "otherHourHigh": null,
            "otherHourIndicator": null,
            "description": null,
            "subjectDescription": <String>,
            "courseDescription": <String>,
            "division": <String>,
            "termStart": <String>,
            "termEnd": <String>,
            "preRequisiteCheckMethodCde": <String>,
            "anySections": null,
            ...
        },
        ...
    ]
    ...
}
```

## Unit tests

This repo contains a [Mocha](https://mochajs.org/) test suite which can be run with `npm test`.

## Deploying to AWS

The library can be deployed to AWS as a Lambda Layer. Use the provided `deploy.sh` script.

## Known issues
[#16](https://github.com/schedulemaker/bannerjs/issues/16) - `getCourseDescription` currently throws an exception due to trying to `JSON.parse` the returned HTML string. At this time please do not use the `getCourseDescription` method.