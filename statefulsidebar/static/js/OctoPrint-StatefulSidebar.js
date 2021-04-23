/*
 * View model for Stateful Sidebar
 *
 * Author: jneilliii
 * License: AGPLv3
 */
$(function() {
    function StatefulSidebarViewModel(parameters) {
        var self = this;

		self.settingsViewModel = parameters[0];
		self.collapsed = ko.observableArray();
		self.touchui = parameters[1];

		// don't load when touchui is active.
		if (self.touchui && self.touchui.isActive()) {
			return;
		}

		self.onBeforeBinding = function(){
			self.collapsed(self.settingsViewModel.settings.plugins.statefulsidebar.collapsed());
		}

		self.onStartupComplete = function(){
			// restore last state
			$.each(self.collapsed(),function( index, value ){
				$('div'+value).removeClass('overflow_visible in').addClass('collapse').siblings('div.accordion-heading').children('a.accordion-toggle').addClass('collapsed');
			});
			// update stored settings on hidden/shown events
			$('div.accordion-body').on('hidden shown',function(){
				self.collapsed($('a.accordion-toggle.collapsed').map(function() { return $(this).attr('data-target'); }).get());
				OctoPrint.settings.savePluginSettings('statefulsidebar', {'collapsed':self.collapsed()});
			});
		}
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: StatefulSidebarViewModel,
        dependencies: ['settingsViewModel','touchUIViewModel'],
		optional: ['touchUIViewModel'],
        elements: []
    });
});
