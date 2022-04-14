import csv
import json
import os

import requests

MAIN_URL = "https://transparentia.newtral.es/api/advanced-search?name=&page={ppage}&salaryRange[]=0&salaryRange[" \
           "]=-1&salaryType=annualSalary&inactive=true "


def form_url(page_to_format, main_url: str):
    page_str = str(page_to_format)
    return main_url.format(ppage=page_str)


def get_json(url_to_get: str):
    headers = {"x-api-key": "x-api-key",
               "x-xsrf-token": "x-xsrf-token"}
    return json.loads(requests.get(url_to_get, headers=headers).text)


def check_csv():
    if not os.path.exists("dump.csv"):
        with open("dump.csv", 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(
                ['name', 'jobTitle', 'gender', 'status', 'annualSalary', 'monthlySalary', 'role', 'currentMemberOf',
                 'workLocation', 'affiliation', 'extraInfo', 'image'])


def get_row_from_result(result: dict) -> list:
    name = result.get('name', '')
    jobTitle = result.get('jobTitle', '')
    gender = result.get('gender', '')
    status = result.get('status', '')
    annualSalary = result.get('currentAnnualSalary', '')
    monthlySalary = result.get('currentMonthlySalary', '')
    role = result.get('role', {}).get('name', '')
    currentMemberOf = result.get('currentMemberOf', {}).get('name', '')
    workLocation = result.get('workLocation', {}).get('name', '')
    affiliation = result.get('affiliation', {}).get('name', '')
    extraInfo = result.get('sameAs', '')
    image = result.get('image', '')
    return [name, jobTitle, gender, status, annualSalary, monthlySalary, role, currentMemberOf, workLocation,
            affiliation,
            extraInfo, image]


def insert_csv(json_results):
    with open('dump.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        for result in json_results:
            row = get_row_from_result(result)
            writer.writerow(row)


if __name__ == '__main__':
    check_csv()

    page = 1
    total_pages = 0
    final_page = False

    while not final_page:
        url = form_url(page, MAIN_URL)
        r = get_json(url)

        if total_pages == 0:
            total_pages = r['data']['pages']

        insert_csv(r['data']['results'])
        print("Request %s done, inserted 20 more" % page)
        page = page + 1
        final_page = (page == total_pages + 1)
