
from typing import List
from datetime import date
from schemas.insights import InsightDetail, InsightQuery, MainServiceQuery

# Dummy function, replace with actual DB query
def get_insights_by_date_main_service(query: 'MainServiceQuery') -> List[InsightDetail]:
	# TODO: Replace with actual database query logic
	dummy = [
		InsightDetail(
			id="689c947efaaec1fe41207c39",
			date=query.date,
			day_of_week="Friday",
			service_id=101,
			main_service_id=query.main_service_id,
			average_processing_time="00:25:00",
			no_show_count=2
		),
		InsightDetail(
			id="689c947efaaec1fe41207c40",
			date=query.date,
			day_of_week="Friday",
			service_id=102,
			main_service_id=query.main_service_id,
			average_processing_time="00:30:00",
			no_show_count=1
		),
		InsightDetail(
			id="689c947efaaec1fe41207c41",
			date=query.date,
			day_of_week="Friday",
			service_id=103,
			main_service_id=9999,
			average_processing_time="00:20:00",
			no_show_count=0
		)
	]
	return [i for i in dummy if i.date == query.date and i.main_service_id == query.main_service_id]

# Dummy function, replace with actual DB query
def get_insights_by_date_sub_service(query: 'InsightQuery') -> List[InsightDetail]:
	# TODO: Replace with actual database query logic
	dummy = [
		InsightDetail(
			id="689c947efaaec1fe41207c39",
			date=query.date,
			day_of_week="Friday",
			service_id=101,
			main_service_id=2001,
			average_processing_time="00:25:00",
			no_show_count=2
		)
	]
	return [i for i in dummy if i.date == query.date and i.service_id == query.service_id and i.main_service_id == query.main_service_id]
