class ThemesLoader
  def initialize(themes_config:, cleanup: false)
    @themes_config = themes_config
    @cleanup = cleanup
  end

  def call
    ActiveRecord::Base.transaction do
      perform_cleanup if @cleanup

      theme_slugs = []
      widget_slugs = []

      content = @themes_config.with_indifferent_access
      content['themes'].each do |theme_conf|
        theme_slug = theme_conf[:slug]
        theme = Theme
          .create_with(
            title: theme_conf['title'],
            description: theme_conf['description']
          )
          .find_or_create_by!(slug: theme_slug)
        theme_slugs << theme_slug

        theme_conf['widgets'].each do |widget_conf|
          widget_slug = widget_conf['slug']
          Widget
            .create_with(widget_conf.except(:indicators, :regions_whitelist).merge(theme: theme))
            .find_or_create_by!(slug: widget_slug)
          widget_slugs << widget_slug
        end
      end

      keep_only_those_themes(theme_slugs)
      keep_only_those_widgets(widget_slugs)
    end

    true
  end

  private

  def perform_cleanup
    Theme.delete_all
  end

  def keep_only_those_themes(keep_slugs)
    Theme.where.not(slug: keep_slugs).delete_all
  end

  def keep_only_those_widgets(keep_slugs)
    Widget.where.not(slug: keep_slugs).delete_all
  end
end
