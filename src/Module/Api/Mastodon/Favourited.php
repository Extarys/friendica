<?php
/**
 * @copyright Copyright (C) 2010-2021, the Friendica project
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

namespace Friendica\Module\Api\Mastodon;

use Friendica\Core\System;
use Friendica\Database\DBA;
use Friendica\DI;
use Friendica\Model\Post;
use Friendica\Module\BaseApi;
use Friendica\Network\HTTPException;
use Friendica\Protocol\Activity;

/**
 * @see https://docs.joinmastodon.org/methods/accounts/favourites/
 */
class Favourited extends BaseApi
{
	/**
	 * @param array $parameters
	 * @throws HTTPException\InternalServerErrorException
	 */
	public static function rawContent(array $parameters = [])
	{
		self::login(self::SCOPE_READ);
		$uid = self::getCurrentUserID();

		// @todo provide HTTP link header

		$request = self::getRequest([
			'limit'      => 20,    // Maximum number of results to return. Defaults to 20.
			'min_id'     => 0,     // Return results immediately newer than id
			'max_id'     => 0,     // Return results older than id
			'with_muted' => false, // Pleroma extension: return activities by muted (not by blocked!) users.
		]);

		$params = ['order' => ['thr-parent-id' => true], 'limit' => $request['limit']];

		$condition = ['gravity' => GRAVITY_ACTIVITY, 'origin' => true, 'verb' => Activity::LIKE, 'uid' => $uid];

		if (!empty($request['max_id'])) {
			$condition = DBA::mergeConditions($condition, ["`thr-parent-id` < ?", $request['max_id']]);
		}

		if (!empty($request['min_id'])) {
			$condition = DBA::mergeConditions($condition, ["`thr-parent-id` > ?", $request['min_id']]);

			$params['order'] = ['thr-parent-id'];
		}

		$items = Post::selectForUser($uid, ['thr-parent-id'], $condition, $params);

		$statuses = [];
		while ($item = Post::fetch($items)) {
			$statuses[] = DI::mstdnStatus()->createFromUriId($item['thr-parent-id'], $uid);
		}
		DBA::close($items);

		if (!empty($request['min_id'])) {
			array_reverse($statuses);
		}

		System::jsonExit($statuses);
	}
}
