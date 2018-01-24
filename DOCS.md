# Tempt Docs
* [`tempted`](#tempted)
* [`untempt`](#untempt)
* [`who`](#who)
* [`at (place)`](#at)

--------------------------------------------------
<a name="tempted"/>

## @{gameName} tempted

This command registers the sender as tempted to play __{gameName}__ in the current thread.
Currently, tempts auto-expire after 1 hour. In the future this will be customizable.

__Usage__

`@{gameName} tempted`

__Arguments__

* `{gameName}`: The name of the game to be tempted with.

__Example__

>`@csgo tempted`

*William Wang is tempted for CSGO.*

--------------------------------------------------
<a name="untempt"/>

## @{gameName} untempt

This command unregisters the sender from being tempted to play __{gameName}__ in the current thread if they are currently tempted.

__Usage__

`@{gameName} untempt`

__Arguments__

* `{gameName}`: The name of the game to untempt from.

__Example__

>`@csgo untempt`

*William Wang is no longer tempted for CSGO.*

--------------------------------------------------
<a name="who"/>

## @{gameName} who

This gives a list of the players in the current thread who are currently tempted for __{gameName}__.

__Usage__

`@{gameName} who`

__Arguments__

* `{gameName}`: The name of the game to list tempted players of.

__Example__

>`@csgo who`
* 0 tempted:
*No one is tempted for CSGO in this thread.*
* 1+ tempted:
*Tempted for CSGO:*
	1. *Michael Li*
	2. *William Wang*

--------------------------------------------------
<a name="at"/>

## @{activity} at {place}

This sets the place where the activity is happening.

__Usage__

`@{activity} at {place}`

__Arguments__

* `{activity}`: The activity to do
* `{place}`: The place where we want to do the activity

__Example__

>`@food at Qdoba`
*Food is now at Qdoba.*

--------------------------------------------------
<a name="where"/>

## @{activity} where

This gives the place where the activity is happening.

__Usage__

`@{activity} where`

__Arguments__

* `{activity}`: The activity to do

__Example__

>`@food at Qdoba`

*Food is now at Qdoba.*

>`@food where`

*Food is at Qdoba.*

--------------------------------------------------
<a name="about"/>

## @{activity} about {subject}

This sets the subject of the activity.
Only applicable for the following activities:
* @hw

__Usage__

`@{activity} about {subject}`

__Arguments__

* `{activity}`: The activity to do
* `{subject}`: The subject we want the activity to be about

__Example__

>`@hw about CV`

*Homework is now about CV.*

--------------------------------------------------
<a name="what"/>

## @{activity} what

This gives the subject of the activity.
Only applicable for the following activities:
* @hw

__Usage__

`@{activity} what`

__Arguments__

* `{activity}`: The activity to do

__Example__

>`@hw about CV`

*Homework is now about CV.*

>`@food what`

*Homework is about CV.*

--------------------------------------------------
<a name="info"/>

## @{activity} what

This gives both the subject and place of the activity.
Only applicable for the following activities:
* @hw

__Usage__

`@{activity} info`

__Arguments__

* `{activity}`: The activity to do

__Example__

>`@hw at GDC`

*Homework is now at GDC.*

>`@hw about CV`

*Homework is now about CV.*

>`@hw info`

*Homework about CV is at GDC.*