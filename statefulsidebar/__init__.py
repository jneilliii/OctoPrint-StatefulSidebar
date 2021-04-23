# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class statefulsidebarPlugin(octoprint.plugin.SettingsPlugin,
                            octoprint.plugin.AssetPlugin):

	##~~ SettingsPlugin mixin

	def get_settings_defaults(self):
		return dict(
			collapsed=[]
		)

	##~~ AssetPlugin mixin

	def get_assets(self):
		return dict(
			js=["js/OctoPrint-StatefulSidebar.js"]
		)

	##~~ Softwareupdate hook

	def get_update_information(self):
		return dict(
			statefulsidebar=dict(
				displayName="Stateful Sidebar",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-StatefulSidebar",
				current=self._plugin_version,
				stable_branch=dict(
					name="Stable", branch="master", comittish=["master"]
				),
				prerelease_branches=[
					dict(
						name="Release Candidate",
						branch="rc",
						comittish=["rc", "master"],
					)
				],

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-StatefulSidebar/archive/{target_version}.zip"
			)
		)


__plugin_name__ = "Stateful Sidebar"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = statefulsidebarPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

