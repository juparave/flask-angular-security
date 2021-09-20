import datetime
from dateutil import tz
import logging

log = logging.getLogger(__name__)


def dateFromJSON(json_date):
    # from_zone = tz.gettz('UTC')
    # to_zone = tz.gettz('America/Mexico_City')
    # METHOD 2: Auto-detect zones: ref:https://stackoverflow.com/questions/4770297/convert-utc-datetime-string-to-local-datetime-with-python
    from_zone = tz.tzutc()
    to_zone = tz.tzlocal()

    date_date = None

    try:
        date_date = datetime.datetime.strptime(json_date, "%Y-%m-%d %H:%M:%S")
        return date_date
    except ValueError as ex:
        log.warn("Incorrect date format '%%Y-%%m-%%d %%H:%%M:%%S'. %s", ex)
    except TypeError as ex:
        log.warn("Incorrect data format %s", ex)

    try:
        date_str = json_date
        utc_date = datetime.datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%fZ")
        # Convert time zone
        utc_date = utc_date.replace(tzinfo=from_zone)
        date_date = utc_date.astimezone(to_zone)
        # removing tzinfo
        date_date = date_date.replace(tzinfo=None)
    except ValueError as ex:
        log.warn("Incorrect data format %s", ex)
    except TypeError as ex:
        log.warn("Incorrect data format %s", ex)

    try:
        date_str = json_date
        date_date = datetime.datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%f")
    except ValueError as ex:
        log.warn("Incorrect data format %s", ex)
    except TypeError as ex:
        log.warn("Incorrect data format %s", ex)

    return date_date


def to_int(s):
    """
    Verifies if a string can be an int
    returns: int or None
    """
    if s is None:
        return None
    if '.' in s:
        # remove decimal point
        s = s.split('.')[0]
    try:
        return int(s)
    except ValueError:
        return None
    except TypeError:
        # when s = None
        return None

def to_float(s):
    """
    Verifies if a string can be a float
    returns: float or None
    """
    if s is None:
        return None
    try:
        return float(s)
    except ValueError:
        return None
    except TypeError:
        # when s = None
        return None

