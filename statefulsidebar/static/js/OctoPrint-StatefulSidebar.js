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
		
		self.onBeforeBinding = function(){
			self.collapsed(self.settingsViewModel.settings.plugins.statefulsidebar.collapsed());
			$.each(self.collapsed(),function( index, value ){
				$('div'+value).removeClass('overflow_visible in').addClass('collapse').siblings('div.accordion-heading').children('a.accordion-toggle').addClass('collapsed');
			});
		}
		
		self.onStartupComplete = function(){				
			// update stored settings on hidden/shown events
			$('div.accordion-body').on('hidden shown',function(){
				self.collapsed($('a.accordion-toggle.collapsed').map(function() { return $(this).attr('data-target'); }).get());
				OctoPrint.settings.savePluginSettings('statefulsidebar', {'collapsed':self.collapsed()});
			});
		}
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: StatefulSidebarViewModel,
        dependencies: ['settingsViewModel'],
        elements: []
    });
});
